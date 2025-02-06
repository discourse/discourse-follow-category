import { readOnly } from "@ember/object/computed";
import { classNames } from "@ember-decorators/component";
import { i18n } from "discourse-i18n";
import {
  pluginApiIdentifiers,
  selectKitOptions,
} from "select-kit/components/select-kit";
import CategoryNotificationsDropdown from "./category-notifications-dropdown";

@pluginApiIdentifiers("category-notifications-dropdown-button")
@selectKitOptions({
  showFullTitle: true,
  i18nPrefix: themePrefix("category_options.notifications"),
  headerAriaLabel: i18n(themePrefix("category_options.notifications.title")),
})
@classNames("category-notifications-dropdown-button")
export default class CategoryNotificationsDropdownButton extends CategoryNotificationsDropdown {
  @readOnly("category.deleted") isHidden;
}
