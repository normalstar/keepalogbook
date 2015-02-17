declare class RawLog {
  key: string;
  value: string;
}

declare class Log {
  dataUrl: string;
  key: string;
  value: string;
  isEditing: boolean;
  editingValue: string;
}

declare class LogToSave {
  log: string;
  ts: number;
}
