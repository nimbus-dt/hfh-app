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
        {{ component.label }}: {{ hfhPrintGetView(component, row[component.key], getView) }}
      </div>
    </div>
  {% }) %}
</div>
`;

const templateWithEditGridChildExample = `
<div class="row hfh_formio_hide_on_print">
  {% util.eachComponent(components, function(component) { %}
    {% if (displayValue(component) && (component.label == "Full legal name"||component.label == "Relationship")) { %}
      <div class="col-sm-3">
        {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}
      </div>
    {% } %}
  {% }) %}
  {% if (!instance.options.readOnly && !instance.disabled) { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
          <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
        {% } %}
      </div>
    </div>
  {% } else { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('eye') }}"></i></button>
      </div>
    </div>
  {% } %}
</div>
<div class="row hfh_formio_show_on_print">
  <div class="row p-3">
    <div class="col-12">
      {{ components[0].label }}: {{ hfhPrintGetView(components[0], row[components[0].key], getView) }}
    </div>
  </div>
  <div class="row p-3">
    <div class="col-12">
      {{ components[1].label }}: {{ hfhPrintGetView(components[1], row[components[1].key], getView) }}
    </div>
  </div>
  <div class="row p-3">
    <div class="col-12">
      {{ components[2].label }}: {{ hfhPrintGetView(components[2], row[components[2].key], getView) }}
    </div>
  </div>
  <div class="row p-3">
    <div class="col-12">
      {{ components[3].label }}: {{ hfhPrintGetView(components[3], row[components[3].key], getView) }}
    </div>
  </div>
  <ul class="list-group p-3">
    <li class="list-group-item list-group-header">
      Income records
    </li>
    {% for(income of row['applicantHouseholdMembersIncomeRecords']){ %}
      <li class="list-group-item">
        {% util.eachComponent(components[4].components, function(component) { %}
        <div class="row p-3">
          <div class="col-12">
            {{ component.label }}: {{ hfhPrintGetView(component, income[component.key], getView) }}
          </div>
        </div>
        {% }) %}
      </li>
    {% } %}
  </ul>
  <ul class="list-group p-3">
    <li class="list-group-item list-group-header">
      Debt records
    </li>
    {% for(debt of row['applicantHouseholdMembersDebtRecords']){ %}
      <li class="list-group-item">
        {% util.eachComponent(components[5].components, function(component) { %}
        <div class="row p-3">
          <div class="col-12">
            {{ component.label }}: {{ hfhPrintGetView(component, debt[component.key], getView) }}
          </div>
        </div>
        {% }) %}
      </li>
    {% } %}
  </ul>
  <ul class="list-group p-3">
    <li class="list-group-item list-group-header">
      Assets records
    </li>
    {% for(asset of row['applicantHouseholdMembersAssetRecords']){ %}
      <li class="list-group-item">
        {% util.eachComponent(components[6].components, function(component) { %}
        <div class="row p-3">
          <div class="col-12">
            {{ component.label }}: {{ hfhPrintGetView(component, asset[component.key], getView) }}
          </div>
        </div>
        {% }) %}
      </li>
    {% } %}
  </ul>
</div>
`;
