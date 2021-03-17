"use babel";

import AtomSvgView from "./atom-svg-view";
import { CompositeDisposable } from "atom";

export default {
  atomSvgView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSvgView = new AtomSvgView(state.atomSvgViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSvgView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // if(atom.workspace.getActiveTextEditor().getPath().toLowerCase().endsWith(".svg")){
    // atom.contextMenu.add({label:"Preview",command:"atom-svg:toggle"});
    // }

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "atom-svg:toggle": () => {
          let workspace = atom.workspace;
          let editor = workspace.getActiveTextEditor();
          let path = editor.getPath();
          if (path.toLowerCase().endsWith(".svg")) {
            //
          } else {
            atom.notifications.addError(
              "Sorry, you can only preview SVG files!",
              { dismissable: true }
            );
          }
          return true;
        },
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSvgView.destroy();
  },

  serialize() {
    return {
      atomSvgViewState: this.atomSvgView.serialize(),
    };
  },

  toggle() {
    console.log("AtomSvg was toggled!");
    return this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show();
  },
};
