import { computed, setProperties } from "@ember/object";
import { classNames } from "@ember-decorators/component";
import { allLevels, buttonDetails } from "discourse/lib/notification-levels";
import { i18n } from "discourse-i18n";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";
import {
  pluginApiIdentifiers,
  selectKitOptions,
} from "select-kit/components/select-kit";
import NotificationsButtonRow from "select-kit/components/notifications-button/notifications-button-row";


@selectKitOptions({
  autoFilterable: false,
  filterable: false,
  i18nPrefix: "",
  i18nPostfix: "",
})
@pluginApiIdentifiers("notifications-button")
@classNames("notifications-button")
export default class FollowNotificationsDropdown extends DropdownSelectBoxComponent {
  content = allLevels;
  nameProperty = "key";

  modifyComponentForRow() {
    return NotificationsButtonRow;
  }

  modifySelection(content) {
    content = content || {};
    const { i18nPrefix, i18nPostfix } = this.selectKit.options;
    const title = i18n(
      `${i18nPrefix}.${this.buttonForValue.key}${i18nPostfix}.title`
    );
    const label = i18n(
      `${i18nPrefix}.${this.buttonForValue.key}${i18nPostfix}.label`
    );
    setProperties(content, {
      title,
      label,
      icon: this.buttonForValue.icon,
    });
    return content;
  }

  @computed("value")
  get buttonForValue() {
    return buttonDetails(this.value);
  }
}
