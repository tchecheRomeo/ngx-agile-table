/**
 * Created by romeo on 24/10/2021.
 */

export class ActionButtonTable {
  key: string;
  icon: string; // Can be Font-awesome icon(with other class if prefer) or image content '/'
  text: string; // if icon empty, used to display link(a tag) text.
  tooltip: string;
  targetData: any;
  target: number;
  displayConditionFn: (data: any) => boolean;

  constructor(key: string, text?: string, icon?: string, tooltip?: string) {
    this.key = key;
    this.icon = icon || '';
    this.text = text || '';
    this.tooltip = tooltip || this.text;
    this.target = -1;
    this.displayConditionFn = data => {
      return true;
    };
  }

  displayCondition(condition: (data: any) => boolean) {
    this.displayConditionFn = condition;
  }
}




