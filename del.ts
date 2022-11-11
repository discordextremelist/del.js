import type { APIChannel, APIRole } from "discord-api-types/v10";
import { request } from "undici";
import type { HttpMethod } from "undici/types/dispatcher";
import { version } from "./package.json";

/**
 * The client for interacting with DEL's API
 * @param {string} token - Your DEL API token
 * @param {string} id - Your Discord Application's ID
 */
export class Del {
  public static baseUrl = "https://api.discordextremelist.xyz/v2";

  constructor();
  constructor(public token?: string, public id?: string) {}

  private async _request(method: HttpMethod, route: string, body?: object) {
    let headers: {
      "User-Agent": string;
      "Content-Type"?: string;
      Authorization?: string;
    } = {
      "User-Agent": `DEL.js/${version}`,
    };
    if (body) {
      if (!this.token) throw new Error("Del not constructed with a token");
      headers["Content-Type"] = "application/json";
      headers["Authorization"] = this.token;
    }

    const response = await request(Del.baseUrl + route, {
      method,
      body,
      headers,
    });

    return response.body.json();
  }

  /**
   * Get Website Statistics
   */
  async getWebsiteStats(): Promise<WebsiteStatistics> {
    return this._request("GET", "/stats");
  }

  /**
   * Get Website Health
   */
  async getWebsiteHealth(): Promise<WebsiteHealth> {
    return this._request("GET", "/health");
  }

  /**
   * Get Bot Information
   * @param {string} id - The bot's ID
   */
  async getBotInfo(id: string): Promise<BotInformation> {
    return this._request("GET", `/bot/${id}`);
  }

  /**
   * Update your bot's stats on DEL
   * @param {number} guildCount - The amount of guilds your bot is in
   * @param {number} shardCount - The amount of shards your bot is using
   */
  async postStats(
    guildCount: number,
    shardCount?: number
  ): Promise<BotStatistics> {
    if (!this.id) throw new Error("Del not constructed with an id");

    const body = shardCount
      ? { guildCount, shardCount }
      : { guildCount, shardCount: 0 };

    return this._request("POST", `/bot/${this.id}/stats`, body);
  }

  /**
   * Get Server Information
   * @param {string} id - The server's ID
   */
  async getServerInfo(id: string): Promise<ServerInformation> {
    return this._request("GET", `/server/${id}`);
  }

  /**
   * Get Template Information
   * @param {string} id - The template's ID
   */
  async getTemplateInfo(id: string): Promise<TemplateInformation> {
    return this._request("GET", `/template/${id}`);
  }

  /**
   * Get User Information
   * @param {string} id - The user's ID
   */
  async getUserInfo(id: string): Promise<UserInformation> {
    return this._request("GET", `/user/${id}`);
  }
}

export interface BaseResponse {
  error: boolean;
  status: number;
}

export interface WebsiteStatistics extends BaseResponse {
  servers: {
    total: number;
  };
  bots: {
    total: number;
    approved: number;
    premium: number;
  };
  users: {
    total: number;
    premium: number;
    staff: {
      total: number;
      mods: number;
      assistants: number;
      admins: number;
    };
  };
  templates: number;
}

export interface WebsiteHealth extends BaseResponse {
  redis_ok: boolean;
  mongo_ok: boolean;
}

export interface BotInformation extends BaseResponse {
  bot: {
    id: string;
    name: string;
    prefix: string;
    tags: string[];
    vanityUrl: string;
    serverCount: number;
    shardCount: number;
    shortDesc: string;
    longDesc: string;
    editors: string[];
    owner: {
      id: string;
    };
    avatar: {
      hash: string;
      url: string;
    };
    links: {
      invite: string;
      support: string;
      website: string;
      donation: string;
      repo: string;
    };
    status: {
      approved: boolean;
      siteBot: boolean;
      archived: boolean;
    };
  };
}

export interface BotStatistics extends BaseResponse {
  guildCount: number;
  shardCount?: number;
}

export interface ServerInformation extends BaseResponse {
  server: {
    id: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    tags: string[];
    owner: {
      id: string;
    };
    icon: {
      hash: string;
      url: string;
    };
    links: {
      website: string;
      donation: string;
    };
  };
}

export interface TemplateInformation extends BaseResponse {
  template: {
    id: string;
    name: string;
    region: string;
    locale: string;
    afkTimeout: number;
    verificationLevel: number;
    defaultMessageNotifications: number;
    explicitContent: number;
    roles: APIRole[];
    channels: APIChannel[];
    usageCount: number;
    shortDesc: string;
    longDesc: string;
    tags: string[];
    fromGuild: string;
    owner: {
      id: string;
    };
    icon: {
      hash: string;
      url: string;
    };
    links: {
      template: string;
    };
  };
}

export interface UserInformation extends BaseResponse {
  user: {
    id: string;
    name: string;
    discrim: string;
    fullUsername: string;
    avatar: {
      hash: string;
      url: string;
    };
    profile: {
      bio: string;
      links: {
        website: string;
        github: string;
        gitlab: string;
        twitter: string;
        instagram: string;
        snapchat: string;
      };
    };
    game: {
      snakes: {
        maxScore: number;
      };
    };
    rank: {
      admin: boolean;
      mod: boolean;
      assistant: boolean;
      tester: boolean;
      translator: boolean;
      covid: boolean;
    };
  };
}
