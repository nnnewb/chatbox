import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

export type Message = UserMessage | AssistantMessageChunk | AssistantMessageDone;

export interface UserMessage {
  id: number;
  role: "user";
  created_at: Date;
  content: string;
}

export interface AssistantMessageChunk {
  id: number;
  done: false;
  role: "assistant";
  content: string;
}

export interface AssistantMessageDone {
  id: number;
  done: true;
  role: "assistant";
  content: string;
  model: string;
  created_at: Date;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);