export interface FileEvent {
    filename: string;
    eventType: 'added' | 'changed' | 'deleted';
    timestamp: string;
  }
  