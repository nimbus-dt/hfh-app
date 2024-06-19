/* eslint-disable @typescript-eslint/no-unused-vars */
const headerTemplate = `
<div class="row hfh_formio_hide_on_print">
  {% util.eachComponent(components, function(component) { %} {% if
  (displayValue(component)) { %}
  <div class="col-sm-3">{{ t(component.label) }}</div>
  {% } %} {% }) %}
  <div class="col-sm-2">Actions</div>
</div>
<div class="row hfh_formio_show_on_print">
  <div class="col-12">Records</div>
</div>
`;

const rowTemplate = `
<div class="row hfh_formio_hide_on_print">
  {% util.eachComponent(components, function(component) { %} {% if
  (displayValue(component)) { %}
  <div class="col-sm-3">
    {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}
  </div>
  {% } %} {% }) %} {% if (!instance.options.readOnly && !instance.disabled) { %}
  <div class="col-sm-2">
    <div class="btn-group pull-right">
      <button class="btn btn-default btn-light btn-sm editRow">
        <i class="{{ iconClass('edit') }}"></i>
      </button>
      {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
      <button class="btn btn-danger btn-sm removeRow">
        <i class="{{ iconClass('trash') }}"></i>
      </button>
      {% } %}
    </div>
  </div>
  {% } else{ %}
  <div class="col-sm-1">
    <div class="btn-group pull-right">
      <button class="btn btn-default btn-light btn-sm editRow">
        <i class="{{ iconClass('eye') }}"></i>
      </button>
    </div>
  </div>
  {% } %}
</div>
<div class="row hfh_formio_show_on_print">
  {% util.eachComponent(components, function(component) { %}
    <div class="row p-3">
      <div class="col-12">
        {{ component.label }}: {{ getView(component, row[component.key]) }}
      </div>
    </div>
  {% }) %}
</div>
`;
