import Component from "@glimmer/component";
import { action, computed } from "@ember/object";
import { service } from "@ember/service";
import { NotificationLevels } from "discourse/lib/notification-levels";

export default class FollowCategoryButton extends Component {
  @service currentUser;

  @computed("args.model.category.notification_level")
  get categoryNotificationLevel() {
    if (
      this.currentUser?.indirectly_muted_category_ids?.includes(
        this.args.model.category.id
      )
    ) {
      return NotificationLevels.MUTED;
    } else {
      return this.args.model.category.notification_level;
    }
  }

  @computed("args.model.category.notification_level")
  get showFollowButton() {
    if (this.args.model.category.notification_level === 1) {
      return true;
    } else {
      return false;
    }
  }

  @action
  changeCategoryNotificationLevel(notificationLevel) {
    this.args.model.category.setNotification(notificationLevel);
  }

  @action
  followCategory() {
    this.args.model.category.setNotification(4);
  }
}
