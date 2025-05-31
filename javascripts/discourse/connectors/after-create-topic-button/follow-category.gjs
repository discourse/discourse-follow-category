import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import FollowCategoryButton from "../../components/follow-category-button";

@tagName("")
export default class FollowCategory extends Component {
  <template><FollowCategoryButton @model={{this.category}} /></template>
}
