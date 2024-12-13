# frozen_string_literal: true

RSpec.describe "Follow Category Button", system: true do
  fab!(:user)
  fab!(:category)

  let!(:theme) { upload_theme_component }

  before do
    sign_in(user)
    CategoryUser.set_notification_level_for_category(
      user,
      NotificationLevels.all[:regular],
      category.id,
    )
  end

  context "when visiting a category page" do
    before { visit "/c/#{category.id}" }

    it "displays the follow button if the notification level is 1" do
      expect(page).to have_css(".follow-category-button")
    end

    it "updates the notification level to 4 when clicking the follow button" do
      find(".follow-category-button").click

      try_until_success do
        expect(CategoryUser.lookup(user, :watching_first_post).pluck(:category_id)).to include(
          category.id,
        )
      end
    end

    it "displays all tracking options on subsequent click" do
      find(".follow-category-button").click
      find(".category-notifications-dropdown-button").click

      expect(page).to have_css(".category-notifications-dropdown-button .select-kit-body")
    end
  end
end
