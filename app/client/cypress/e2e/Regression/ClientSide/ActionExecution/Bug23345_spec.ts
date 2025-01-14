import {
  agHelper,
  draggableWidgets,
  entityExplorer,
  propPane,
} from "../../../../support/Objects/ObjectsCore";

describe("Delete No Action card without any error", () => {
  it("1. Bug 23345", () => {
    entityExplorer.DragDropWidgetNVerify(draggableWidgets.BUTTON, 200, 200);

    propPane.AddAction("onClick");

    agHelper.AssertElementVisible(propPane._actionCardByTitle("No action"));

    agHelper.GetNClick(propPane._actionSelectorDelete);

    agHelper.AssertElementAbsence(propPane._actionCardByTitle("No action"));
  });
});
