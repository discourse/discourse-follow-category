import { readOnly } from '@ember/object/computed';
import { or } from "@ember/object/computed";
import I18n from "I18n";
import CategoryNotificationsDropdown from "./category-notifications-dropdown";

export default CategoryNotificationsDropdown.extend({
  pluginApiIdentifiers: ["category-notifications-dropdown-button"],
  classNames: ["category-notifications-dropdown-button"],
  isHidden: readOnly("category.deleted"),

  selectKitOptions: {
    showFullTitle: true,
    i18nPrefix: themePrefix("category_options.notifications"),
    headerAriaLabel: I18n.t(
      themePrefix("category_options.notifications.title")
    ),
  },
});
