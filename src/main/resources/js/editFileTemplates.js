function OnSubmitForm () {
    if(document.pressed == 'Удалить') {
        document.claimTemplatesListForm.action ="deletefiletemplate";
    }
    return true;
}