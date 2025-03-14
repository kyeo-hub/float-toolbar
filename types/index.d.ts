declare type ToolbarItem = {
    type: 'link' | 'popup';
    icon: string;
    text: string;
    link?: string;
    popup?: {
      title?: string;
      description?: string;
      qrCode?: string;
      phone?: string;
      phoneIcon?: string;
    };
  };
  
  declare interface ToolbarConfig {
    items: ToolbarItem[];
    position?: { right?: string; top?: string };
    theme?: 'light' | 'dark';
    breakpoint?: number;
    toggleIcon?: string;
    assetBase?: string;
  }
  
  declare class FloatToolbar {
    constructor(config: ToolbarConfig);
    toggle(): void;
    updateItems(newItems: ToolbarItem[]): void;
    destroy(): void;
  }
  
  export { FloatToolbar, ToolbarConfig, ToolbarItem };