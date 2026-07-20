export const OTP_RATE_LIMIT_MS = 2 * 60 * 1000; // 2 minutes

const STORAGE_KEY = "otp_rate_limits" as const;

export interface OtpEntity {
  identifier: string;
  expIn: number; // timestamp (ms)
}

class AuthOTPStore {
  private readAll(): OtpEntity[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as OtpEntity[];
    } catch {
      return [];
    }
  }

  private writeAll(entities: OtpEntity[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
    } catch {
      // localStorage might be unavailable (SSR, private mode, etc.)
    }
  }

  find(identifier: string): OtpEntity | null {
    return this.readAll().find((e) => e.identifier === identifier) ?? null;
  }

  /**
   * Creates a new OtpEntity or overrides the existing one for the given identifier.
   * Always resets expIn to now + OTP_RATE_LIMIT_MS (fresh successful request).
   */
  upsert(identifier: string): OtpEntity {
    const entities = this.readAll();

    const entity: OtpEntity = {
      identifier,
      expIn: Date.now() + OTP_RATE_LIMIT_MS,
    };

    const index = entities.findIndex((e) => e.identifier === identifier);

    if (index !== -1) {
      entities[index] = entity;
    } else {
      entities.push(entity);
    }

    this.writeAll(entities);
    return entity;
  }

  /**
   * Returns remaining rate-limit time in ms.
   * Returns 0 if not found or already expired.
   */
  getRemainingTime(identifier: string): number {
    const entity = this.find(identifier);
    if (!entity) return 0;
    const remaining = entity.expIn - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  remove(identifier: string): void {
    const filtered = this.readAll().filter((e) => e.identifier !== identifier);
    this.writeAll(filtered);
  }
}

export const authOTPStore = new AuthOTPStore();
