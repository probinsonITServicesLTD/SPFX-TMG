import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneCheckbox,
    PropertyPaneSlider,
    PropertyPaneChoiceGroup,
    PropertyPaneButton
  } from '@microsoft/sp-webpart-base';

  import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';


export function BuildPane(paneName : string) : any {

    let _tile = {
        header: {
          description: paneName
        },
        groups: [
          {
            groupFields: [
              PropertyPaneTextField('headerText', {
                label: "Enter header text",
              }),
  
              PropertyPaneCheckbox('setHeaderTextColor',{
                text:"Set header text color",
                checked: false
              }),
              PropertyPaneSlider('headerTextSize',{
                label : "Set header text size",
                min : 10,
                max : 150,
                value : 30,
                showValue : true,
                step : 1 
              }),
              PropertyPaneChoiceGroup('alignText',{
                label : 'Align Text',
                options : [
                  {key : 'left', text : 'left'},
                  {key : 'center', text : 'center'},
                  {key : 'right', text : 'right'}
                ]
              }),
              PropertyPaneSlider('headerPadding',{
                label : "Set Header padding",
                min : 0,
                max : 50,
                value : 0,
                showValue : true,
                step : 1 
              }),
              PropertyPaneSlider('headerMargin',{
                label : "Set Header Margin",
                min : 0,
                max : 50,
                value : 0,
                showValue : true,
                step : 1 
              }),
              PropertyPaneCheckbox('showBorder',{
                text:"Show Border",
                checked:false
              }),
              PropertyPaneSlider('borderWidth',{
                label : "Set Border Width",
                min : 0,
                max : 50,
                value : 1,
                showValue : true,
                step : 1 
              }),
              PropertyPaneCheckbox('setBorderTextColor',{
                text:"Set border color",
                checked: false
              }),
            ]
          }
        ]
      }

      return _tile;
}

export function setDefaultProppertyPane(): IPropertyPaneConfiguration {
    //toggle some componets
    let setHeaderColor: any;
    let setBorderColor: any;
    let setTMGCBorderColor : any;

    if(this.properties.setHeaderTextColor){
      setHeaderColor = PropertyFieldColorPicker('headerColor', {
        label: 'Header Color',
        selectedColor: this.properties.headerColor,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Full,
        iconName: 'Precipitation',
        key: 'colorFieldId'
      })
    } else {
      setHeaderColor = "";
    }

    if(this.properties.setBorderTextColor){
      setBorderColor = PropertyFieldColorPicker('borderColor', {
        label: 'Header Color',
        selectedColor: this.properties.borderColor,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Full,
        iconName: 'Precipitation',
        key: 'colorFieldId'
      })
    } else {
      setBorderColor = "";
    }

    if(this.properties.setTMGCBorderColor){
      setTMGCBorderColor = PropertyFieldColorPicker('TMGCBorderColor', {
        label: 'Header Color',
        selectedColor: this.properties.TMGCBorderColor,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Full,
        iconName: 'Precipitation',
        key: 'colorFieldId'
      })
    } else {
      setTMGCBorderColor = "";
    }
    
    return {
        pages: [
          {
            header: {
              description: "Header Config"
            },
            groups: [
              {
                groupFields: [
                  PropertyPaneTextField('headerText', {
                    label: "Enter header text",
                  }),
  
                  PropertyPaneCheckbox('setHeaderTextColor',{
                    text:"Set header text color",
                    checked: false
                  }),
                  setHeaderColor,
                  PropertyPaneSlider('headerTextSize',{
                    label : "Set header text size",
                    min : 10,
                    max : 150,
                    value : 30,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneChoiceGroup('alignText',{
                    label : 'Align Text',
                    options : [
                      {key : 'left', text : 'left'},
                      {key : 'center', text : 'center'},
                      {key : 'right', text : 'right'}
                    ]
                  }),
                  PropertyPaneSlider('headerPadding',{
                    label : "Set Header padding",
                    min : 0,
                    max : 50,
                    value : 0,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneSlider('headerMargin',{
                    label : "Set Header Margin",
                    min : 0,
                    max : 50,
                    value : 0,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneCheckbox('showBorder',{
                    text:"Show Border",
                    checked:false
                  }),
                  PropertyPaneSlider('borderWidth',{
                    label : "Set Border Width",
                    min : 0,
                    max : 50,
                    value : 1,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneCheckbox('setBorderTextColor',{
                    text:"Set border color",
                    checked: false
                  }),
                  setBorderColor
                ]
              }
            ]
          },
          {
            header: {
              description: "Outer Tile Config"
            },
            groups: [
              {
                groupFields: [
                  PropertyPaneCheckbox('showTMGCBorder',{
                    text:"Show Border",
                    checked:false
                  }),
                  PropertyPaneSlider('TMGCPadding',{
                    label : "Set padding",
                    min : 0,
                    max : 50,
                    value : 0,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneSlider('TMGCMargin',{
                    label : "Set Margin",
                    min : 0,
                    max : 50,
                    value : 0,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneSlider('borderTMGCWidth',{
                    label : "Set Border Width",
                    min : 0,
                    max : 50,
                    value : 1,
                    showValue : true,
                    step : 1 
                  }),
                  PropertyPaneCheckbox('setTMGCBorderColor',{
                    text:"Set border color",
                    checked: false
                  }),
                  setTMGCBorderColor,
                  PropertyPaneButton('numberTypeOfContent',{
                    text: 'Add Tile',
                    icon: 'Add',
                    onClick: this.addTile.bind(this)
                  })
                ]
              }
            ]
          }
        ]
      };
}