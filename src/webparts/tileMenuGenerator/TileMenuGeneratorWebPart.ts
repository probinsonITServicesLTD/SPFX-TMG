import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import {BuildPane} from './BuildTilePropertyPane';
import { SPHttpClient } from '@microsoft/sp-http';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup,
  PropertyPaneButton

} from '@microsoft/sp-webpart-base';

import * as strings from 'TileMenuGeneratorWebPartStrings';
import TileMenuGenerator from './components/TileMenuGenerator';
import { ITileMenuGeneratorProps } from './components/ITileMenuGeneratorProps';

export interface ITileMenuGeneratorWebPartProps {
  context:any;
  tileState:any;
  description: string;
  headerText: string;
  showBorder : boolean;
  headerTextSize: number;
  headerPadding: number;
  headerMargin : number;
  headerColor:string;
  showSetHeaderTextColorControl:boolean;
  setHeaderTextColor:boolean;
  setBorderTextColor:boolean;
  borderColor:string;
  borderWidth:number;
  alignText:string;

  disableEdit:boolean;

  //TileContainer properties
  showTMGCBorder : boolean;
  borderTMGCWidth: number;
  setTMGCBorderColor: boolean;
  TMGCBorderColor: string;
  TMGCMargin: number;
  TMGCPadding: number;

  //Tiles Properties
  tilePadding: number;
  tileMargin: number;
  tileBorderWidth: number;
  tileBorderColor: string;
  showTileBorder: boolean;
  inEditMode:boolean;
}

export interface ITileListState{
  Id : string;
  TileData : string;
}

export default class TileMenuGeneratorWebPart extends BaseClientSideWebPart<ITileMenuGeneratorWebPartProps> {


  private eventOpen = new Event('onPropertyPaneOpen');
  private eventClosed = new Event('onPropertyPaneClosed');

  constructor(){
    super();    
  }

  public render(): void {
    
    const element: React.ReactElement<ITileMenuGeneratorProps> = React.createElement(
      TileMenuGenerator,
      {

        //Header properties
        disableEdit : this.properties.disableEdit,
        context:this.context,
        description: this.properties.description,
        headerText : this.properties.headerText,
        showBorder : this.properties.showBorder,
        headerTextSize : this.properties.headerTextSize,
        headerPadding: this.properties.headerPadding,
        headerMargin: this.properties.headerMargin,
        headerColor:this.properties.headerColor,
        showSetHeaderTextColorControl : this.properties.showSetHeaderTextColorControl,
        setHeaderTextColor: this.properties.setHeaderTextColor,
        setBorderTextColor:this.properties.setBorderTextColor,
        borderColor:this.properties.borderColor,
        borderWidth:this.properties.borderWidth,
        alignText:this.properties.alignText,

        //TileContainer properties
        showTMGCBorder:this.properties.showTMGCBorder,
        borderTMGCWidth:this.properties.borderTMGCWidth,
        setTMGCBorderColor: this.properties.setTMGCBorderColor,
        TMGCBorderColor: this.properties.TMGCBorderColor,
        TMGCMargin:this.properties.TMGCMargin,
        TMGCPadding:this.properties.TMGCPadding,   

        //Tile properties
        tilePadding: this.properties.tilePadding,
        tileMargin: this.properties.tileMargin,
        tileBorderWidth: this.properties.tileBorderWidth,
        tileBorderColor: this.properties.tileBorderColor,
        showTileBorder: this.properties.showTileBorder,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  private Pages;

//   private readAllItems() : void{
//     this.getListItems().then(listItems =>{
//       console.log("data " +listItems);
//       return JSON.stringify(listItems);
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }

//   private getListItems() : Promise<ITileListState[]>{
//     console.log(this.context.instanceId);
//     const url : string = this.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('" + this.context.instanceId + "')/items(1)";
//     return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
//       .then(response =>{
//         console.log(response.json);
//         return response.json();
//       })
//       .then(json =>{
//         console.log(json.value);
//         return json.value;
//       }) as Promise<ITileListState[]>;
// }


  private addTile():void{   
    this.Pages.pages.push(BuildPane("test pane"));
    console.log("Page Added" + this.Pages.pages.length);
    this.context.propertyPane.refresh();
  }

  // protected onPropertyPaneRendered(): void {
  //  window.dispatchEvent(this.eventOpen);
  // }

  protected onPropertyPaneConfigurationStart():void{
    window.dispatchEvent(this.eventOpen);
  }

  protected onPropertyPaneConfigurationComplete(): void{
    window.dispatchEvent(this.eventClosed);
  }

   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {    
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

    this.Pages = {
      pages: [
        {
          header: {
            description: "Header Config"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneCheckbox('disableEdit',{
                  text:"Toggle Edit Mode",
                  checked:false
                }),
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
        },
        {
          header: {
            description: "Tile Config"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneCheckbox('showTileBorder',{
                  text:"Show Border",
                  checked:true
                }),
                PropertyPaneSlider('tilePadding',{
                  label : "Set padding",
                  min : 0,
                  max : 50,
                  value : 5,
                  showValue : true,
                  step : 1 
                }),
                PropertyPaneSlider('tileMargin',{
                  label : "Set Margin",
                  min : 0,
                  max : 50,
                  value : 5,
                  showValue : true,
                  step : 1 
                }),
                PropertyPaneSlider('tileBorderWidth',{
                  label : "Set Border Width",
                  min : 0,
                  max : 50,
                  value : 1,
                  showValue : true,
                  step : 1 
                }),
                PropertyPaneCheckbox('tileBorderColor',{
                  text:"Set border color",
                  checked: false
                }),
                setTMGCBorderColor,
              ]
            }
          ]
        }
      ]
    };

    console.log("Pages " + this.Pages.pages.length);
    return this.Pages;
  }
}


