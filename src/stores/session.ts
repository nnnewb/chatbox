import { defineStore } from "pinia";

export interface Session {
  id: number;
  name: string;
  last_message: string;
}

interface SessionState {
  sessions: Session[];
}

export const useSession = defineStore("session", {
  state: () => {
    const saved = localStorage.getItem("sessions");
    if (saved) {
      return JSON.parse(saved) as SessionState;
    }
    return { sessions: [] } as SessionState;
  },
  actions: {
    create_session(name: string): Session {
      const maximum = this.sessions.reduce((acc, cur) => (acc > cur.id ? acc : cur.id), 0);
      const session = {
        id: maximum + 1,
        name: name,
        last_message: "",
      };
      this.add_session(session);
      return session;
    },
    add_session(session: Session): void {
      this.sessions.push(session);
      localStorage.setItem("sessions", JSON.stringify({ sessions: this.sessions }));
    },
    list_session(): Session[] {
      return this.sessions;
    },
    get_session(id: number): Session | undefined {
      return this.sessions.find((s) => s.id === id);
    },
    remove_session(id: number): void {
      this.sessions = this.sessions.filter((s) => s.id !== id);
      localStorage.setItem("sessions", JSON.stringify({ sessions: this.sessions }));
    },
  },
});
