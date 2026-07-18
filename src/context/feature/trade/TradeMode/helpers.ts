import Cookies from "js-cookie";
const IS_DEMO_KEY = "is_demo";
const DEMO_EXP_IN_KEY = "demo_exp_in";

interface DemoConfig {
  isDemo: boolean;
  expIn: number | null;
}

class TradeModeStore {
  static storeIsDemo(isDemo: boolean) {
    Cookies.set(IS_DEMO_KEY, String(isDemo), {
      expires: 3650,
    });
  }
  static storeExpIn(time: number) {
    Cookies.set(DEMO_EXP_IN_KEY, String(time), {
      expires: Math.floor(time / 1000),
    });
  }
  static getTradeModeConfig(): DemoConfig {
    const expIn = Cookies.get(DEMO_EXP_IN_KEY);
    const isDemo = Cookies.get(IS_DEMO_KEY);
    return {
      expIn: expIn ? Number(expIn) : null,
      isDemo: isDemo === "true",
    };
  }
  static clearStore() {
    Cookies.remove(DEMO_EXP_IN_KEY);
    Cookies.remove(IS_DEMO_KEY);
  }
  static isExpiredDemo(): boolean {
    if (!isFinite(this.getTradeModeConfig().expIn as number)) return true;
    return Date.now() >= (this.getTradeModeConfig().expIn ?? 0);
  }
}

export { DEMO_EXP_IN_KEY, IS_DEMO_KEY, TradeModeStore };
