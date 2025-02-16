const commonlocators = require("../../../../../locators/commonlocators.json");
const widgetsPage = require("../../../../../locators/Widgets.json");
import * as _ from "../../../../../support/Objects/ObjectsCore";

describe("List widget V2 PropertyPane", () => {
  it("1. Validate isVisible", () => {
    cy.dragAndDropToCanvas("listwidgetv2", {
      x: 300,
      y: 300,
    });
    cy.openPropertyPane("listwidgetv2");
    cy.UncheckWidgetProperties(commonlocators.visibleCheckbox);
    _.deployMode.DeployApp();
    cy.get(widgetsPage.listWidgetv2).should("not.exist");
    _.deployMode.NavigateBacktoEditor();

    // Open Property pane
    cy.openPropertyPane("listwidgetv2");
    //Check the disableed checkbox and Validate
    cy.CheckWidgetProperties(commonlocators.visibleCheckbox);
    _.deployMode.DeployApp();
    cy.wait(2000); //for the deployed page to load fully
    cy.get(widgetsPage.listWidgetv2).should("be.visible");
    _.deployMode.NavigateBacktoEditor();
  });

  it("2. Toggle JS - Validate isVisible", function () {
    // Open Property pane
    cy.get(widgetsPage.listWidgetv2).should("be.visible");
    cy.openPropertyPane("listwidgetv2");
    //Uncheck the disabled checkbox using JS and validate
    cy.get(widgetsPage.toggleVisible).click({ force: true });
    cy.testJsontext("visible", "false");
    _.deployMode.DeployApp();
    cy.get(widgetsPage.listWidgetv2).should("not.exist");
    _.deployMode.NavigateBacktoEditor();
    // Open Property pane
    cy.openPropertyPane("listwidgetv2");
    //Check the disabled checkbox using JS and Validate
    cy.testJsontext("visible", "true");
    _.deployMode.DeployApp();
    cy.get(widgetsPage.listWidgetv2).should("be.visible");
    _.deployMode.NavigateBacktoEditor();
  });

  it("3. Renaming the widget from Property pane and Entity explorer ", function () {
    // Open Property pane
    cy.CheckAndUnfoldEntityItem("Widgets");
    cy.selectEntityByName("List1");
    // Change the list widget name from property pane and Verify it
    cy.widgetText(
      "List2",
      widgetsPage.listWidgetName,
      widgetsPage.listWidgetName + " " + commonlocators.listWidgetNameTag,
    );
    // Change the list widget name from Entity Explorer
    cy.renameEntity("List2", "List1");
    // Mouse over to list name
    _.entityExplorer.SelectEntityByName("List1");
    cy.get(widgetsPage.listWidgetName)
      .first()
      .trigger("mouseover", { force: true });
    // Verify the list name is changed
    cy.contains(
      widgetsPage.listWidgetName + " " + commonlocators.listWidgetNameTag,
      "List1",
    );
  });

  it("4. Item Spacing Validation ", function () {
    cy.openPropertyPane("listwidgetv2");
    cy.get(commonlocators.PropertyPaneSearchInput).type("item spacing");
    cy.testJsontext("itemspacing\\(px\\)", "-1");
    cy.evaluateErrorMessage("Minimum allowed value: 0");

    cy.testJsontext("itemspacing\\(px\\)", "10");
  });

  // TODO: (TOLU) Add styling tests when Theming is merged
});
