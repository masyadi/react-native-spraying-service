const init = {
  /** @type {string} */
  baseUrl: null,
  /** @type {string} */
  appToken: null,
  /** @type {{id: string, name: string, phone?: string, email?: string}} */
  externalUser: null,
  /** @type {number} */
  coin: null,
  /** @type {(e: Error | string) => void} */
  onError: null,
  /** @type {() => void} */
  onTokenExpired: null,
  // onExit: null,
  /** @type {(response: Object) => void} */
  onOrderSuccess: null,
};

let config = init;

/**
 * @returns {typeof config}
 */
export const getConfig = () => {
  return config;
};

/**
 * @param {Partial<typeof config>} newConfig
 */
export const setConfig = (newConfig) => {
  config = { ...config, ...newConfig };
};

export const resetConfig = () => {
  config = init;
};

/**
 *
 * @param {Object} response
 */
export const triggerOrderSuccess = (response) => {
  if (typeof config.onOrderSuccess === "function") {
    config.onOrderSuccess(response);
  } else {
    console.warn("[SprayingService] Order success, but no handler provided.");
  }
};

/**
 * @param {Error | string} error
 */
export const triggerError = (error) => {
  if (typeof config.onError === "function") {
    try {
      config.onError(error);
    } catch (err) {
      console.error("[SprayingService] Error in onError callback:", err);
    }
  } else {
    console.warn("[SprayingService] Unhandled error:", error);
  }
};

export const triggerTokenExpired = () => {
  if (typeof config.onTokenExpired === "function") {
    try {
      config.onTokenExpired();
    } catch (err) {
      console.error("[SprayingService] Error in onTokenExpired callback:", err);
    }
  } else {
    console.warn("[SprayingService] Token expired, but no handler provided.");
  }
};
