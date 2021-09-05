
interface SessionData {
    id: string | undefined;
}

const saveSession = (sessionData: SessionData): SessionData => {
    sessionStorage.setItem("session", JSON.stringify(sessionData));
    return sessionData;
};

export const clearSession = (): void => {
    sessionStorage.removeItem("session");
};

export const loadSession = (): SessionData | null => {
    try {
        const sessionData = sessionStorage.getItem("session");
        return sessionData ? JSON.parse(sessionData) : null;
    } catch (e) {
        return null;
    }
};


export const upsertSessionUserId = (newId: any): void => {
    const curSession = loadSession() || {
        id: undefined,
    };
    saveSession({ ...curSession, id: newId.toString() });
};


export const hasSession = (): boolean => !!sessionStorage.getItem("session");
