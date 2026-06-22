import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import routeAction from "discourse/helpers/route-action";
import { NotificationLevels } from "discourse/lib/notification-levels";
import { i18n } from "discourse-i18n";
import CategoryNotificationsDropdownButton from "../components/category-notifications-dropdown-button";

export default class FollowCategoryButton extends Component {
  @service currentUser;

  get indirectlyMutedCategoryIds() {
    return this.currentUser?.indirectly_muted_category_ids || [];
  }

  get categoryNotificationLevel() {
    if (this.indirectlyMutedCategoryIds.includes(this.args.model.id)) {
      return NotificationLevels.MUTED;
    } else {
      return this.args.model?.get("notification_level");
    }
  }

  get showFollowButton() {
    return (
      this.args.model?.get("notification_level") === NotificationLevels.NORMAL
    );
  }

  @action
  changeCategoryNotificationLevel(notificationLevel) {
    this.args.model?.setNotification(notificationLevel);
  }

  @action
  followCategory() {
    this.args.model?.setNotification(NotificationLevels.WATCHING_FIRST_POST);
  }

  <template>
    {{#if @model}}
      {{#if this.showFollowButton}}
        <DButton
          @action={{if
            this.currentUser
            this.followCategory
            (routeAction "showLogin")
          }}
          @icon="bell"
          @translatedLabel={{i18n (themePrefix "follow_category_button_title")}}
          class="follow-category-button btn-default"
        />
      {{else}}
        <CategoryNotificationsDropdownButton
          @value={{this.categoryNotificationLevel}}
          @category={{@model}}
          @onChange={{if
            this.currentUser
            this.changeCategoryNotificationLevel
            (routeAction "showLogin")
          }}
        />
      {{/if}}
    {{/if}}
  </template>
}
