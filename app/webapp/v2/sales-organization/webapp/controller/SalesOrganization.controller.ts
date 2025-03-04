import Controller from "sap/ui/core/mvc/Controller";
import ColumnListItem from "sap/m/ColumnListItem";
import Input from "sap/m/Input";
import Table from "sap/m/Table";
import { ListKeyboardMode } from "sap/m/library";
import Button from "sap/m/Button";
import Text from "sap/m/Text";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace v2.salesorganization.controller
 */
export default class SalesOrganization extends Controller {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  oEditableTemplate: ColumnListItem;
  oReadOnlyTemplate: ColumnListItem;
  oTable: Table;
  editButton: Button;
  addButton: Button;
  saveButton: Button;
  cancelButton: Button;
  oModel: ODataModel;
  public onInit(): void {
    const ownerComponent = this.getOwnerComponent();
    if (ownerComponent !== undefined) {
      this.oModel = ownerComponent.getModel() as ODataModel;
    }
    this.editButton = this.byId("editButton") as Button;
    this.addButton = this.byId("addButton") as Button;
    this.saveButton = this.byId("saveButton") as Button;
    this.cancelButton = this.byId("cancelButton") as Button;

    this.oTable = this.byId("idSalesOrganizationTable") as Table;
    this.oReadOnlyTemplate = new ColumnListItem({
      cells: [
        new Text({
          text: "{SalesOrganization}",
        }),
        new Text({
          text: "{SalesOrganizationName}",
        }),
      ],
    });
    this.oEditableTemplate = new ColumnListItem({
      cells: [
        new Text({
          text: "{SalesOrganization}",
        }),
        new Input({
          value: "{SalesOrganizationName}",
        }),
      ],
    });
  }

  public onEdit(): void {
    this.editButton.setVisible(false);
    this.saveButton.setVisible(true);
    this.addButton.setVisible(true);
    this.cancelButton.setVisible(true);
    this.rebindTable(this.oEditableTemplate, ListKeyboardMode.Edit);
  }

  public onAdd(): void {
    // TODO: Add new Sales Organization via a Popup
  }

  public onSave(): void {
    this.saveButton.setVisible(false);
    this.addButton.setVisible(false);
    this.cancelButton.setVisible(false);
    this.editButton.setVisible(true);
    if (this.oModel.hasPendingChanges()) {
      this.oModel.submitChanges();
    }
    this.rebindTable(this.oReadOnlyTemplate, ListKeyboardMode.Navigation);
  }

  public onCancel(): void {
    this.saveButton.setVisible(false);
    this.addButton.setVisible(false);
    this.cancelButton.setVisible(false);
    this.editButton.setVisible(true);
    this.oModel.resetChanges();
    this.rebindTable(this.oReadOnlyTemplate, ListKeyboardMode.Navigation);
  }

  public rebindTable(
    oTemplate: ColumnListItem,
    sKeyboardMode: ListKeyboardMode
  ): void {
    this.oTable
      .bindItems({
        path: "/A_SalesOrganizationText",
        template: oTemplate,
        templateShareable: true,
        key: "SalesOrganization",
      })
      .setKeyboardMode(sKeyboardMode);
  }
}
