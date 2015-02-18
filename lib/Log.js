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
  isViewingOptions: boolean;
  isConfirmingRemove: boolean;
}

declare class LogToSave {
  log: string;
  ts: number;
}
