/**
 * Created by romeo on 24/10/2021.
 */

export class ActionButtonTable {
  key: string;
  icon: string; // Can be Font-awesome icon(with other class if prefer) or image content '/'
  text: string; // if icon empty, used to display link(a tag) text.
  tooltip: string;
  html: string;
  targetData: any;
  target: number;
  displayConditionFn: (data: any) => boolean;

  constructor(key: string, text?: string, icon?: string, tooltip?: string, html?: string) {
    this.key = key;
    this.icon = icon || '';
    this.text = text || '';
    this.tooltip = tooltip || this.text;
    this.html = html || '';
    this.target = -1;
    this.displayConditionFn = data => true;
  }

  keyValue(value: string): ActionButtonTable {
    this.key = value;
    return this;
  }

  iconValue(value: string): ActionButtonTable {
    this.icon = value || '';
    return this;
  }

  textValue(value: string): ActionButtonTable {
    this.text = value || '';
    return this;
  }

  tooltipValue(value: string): ActionButtonTable {
    this.tooltip = value || '';
    return this;
  }

  htmlValue(value: string): ActionButtonTable {
    this.html = value || '';
    return this;
  }

  displayCondition(condition: (data: any) => boolean): ActionButtonTable {
    this.displayConditionFn = condition;
    return this;
  }
}




