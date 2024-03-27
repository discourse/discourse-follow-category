import { hbs } from "ember-cli-htmlbars";
import RenderGlimmer from "discourse/widgets/render-glimmer";
import { createWidget } from "discourse/widgets/widget";

createWidget("follow-category", {
  html(attrs) {
    return [
      new RenderGlimmer(
        this,
        "div.category-follow-button",
        hbs`<FollowCategoryButton @model={{@data.attrs}} />`,
        {
          attrs,
        }
      ),
    ];
  },
});
