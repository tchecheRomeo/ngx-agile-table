
# Angular Agile Table

Ngx-agile-table is a library that has been designed to allow you to quickly display data as table in a simple and efficient way. By simple configuration, this library will produce a responsive table that supports filters by column, ordering by column, pagination and many others. Supported data: Text, Html.


## Demo

See live demo [Stackblitz](https://stackblitz.com/edit/ngx-agile-table-angular-v8). 


## Versions

|Angular| ngx-agile-table| Translate Module |
|--|--|--|
| >=8.0.0 | v0.8.1 & v0.8.2 | NO |
| >=8.0.0 | v0.8.4 to v0.8.6 | YES |
| >=13.0.0 | v1.x | NO |

## Installation

The library is available as npm package, so all you need to do is to run the following command

```bash
  npm install --save @ngx-translate/core@12.0.0 @ngx-translate/http-loader@4.0.0 ngx-agile-table@v0.8.3
```
## Minimal Setup Example

 Import the ngx-agile-table directives into your component.
 ```bash
  import {NgxAgileTableModule} from "ngx-agile-table";
  import {TranslateModule} from '@ngx-translate/core';
```
Add module **NgxAgileTableModule** and **TranslateModule** into your module.ts

```bash
// ...

@NgModule({
  imports: [
    // ...
    
    NgxAgileTableModule,
    TranslateModule.forRoot(),
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```
Describe table column (name and data property) into your dedicated component

```bash
// ...
import {ColumnTable} from "ngx-agile-table";

// ...

columns: ColumnTable[] = [
    new ColumnTable('First Name', 'firstName'),
    new ColumnTable('Last Name', 'lastName'),
    new ColumnTable('Age', 'age'),
    new ColumnTable('Country', 'address.country'),
    new ColumnTable('First P.O Box', 'address.box[0].name')
  ];

// ...

```
**Note** : You can use the dot(.) or square brackets([]) to navigate from one property to another.

Next, fetch your data list from the server or build an example like below

```bash
customers: any[] = [{
    firstName: 'Romeo',
    lastName: '<strong>Klaus</strong>',
    age: 18,
    address: {
        country: 'Cameroon',
        city: 'Douala',
        box: [
            {
                name: 'Avenue Kenedy',
                code: 3425
            },
            {
                name: 'Rond point Deido',
                code: 8001
            }
        ]
    }
}, 
{
    firstName: 'Eric',
    lastName: '<strong>Laghom</strong>',
    age: 56
}];

```

**Note** : Library supported text, number, html as data value. When property does not exist, library put automatically an empty string.

Finally, use **ngx-table** tag to display your data in html file or in template property

```bash
<ngx-table [columnSettings]="columns" [data]="customers"></ngx-table>
```

Save all files or start angular server using command below
```bash
ng serve --open
```

Well done !!!
## Inputs and Outputs descriptions

**Inputs**

| Name | Type | Default | Description |
|  --  |  --  |    --   |      --     |
| data | any[] | [ ] | The data array |
| emptyText | string | No content | Text to display when data array to display empty |
| columnSettings | ColumnTable[] | [ ] | Table columns description  |
| enableColumnFiltering | boolean | true | Enable/disable column filtering |
| enableColumnSorting | boolean | true | Enable/disable column sorting |
| actionButtons | ActionButtonTable[] | [ ] | Action button(s) details to be displayed at the beginning of each line |
| actionButtonTitle | string | <empty string> | Title of the action button column. |
| collapseActionButton | ActionButtonTable | '...' button | Display button to tell the user that there are other action buttons |
| maxActionButtonPerRow | number | 3 | Max action button(s) to be displayed at the beginning of each line |
| collapseActionButtonPosition | string | right | Allows you to orient the drop-down list of hidden action buttons to the right or to the bottom. |
| localPagination | boolean | false | Enable/disable library support for paging |
| totalElements | number | 0 | Total data elements |
| totalElementsText | string | Total Elements | Total element text to diplay
| totalPages | number | 0 | Total pages. Calculate automatically if local pagination enabled.
| elementPerPage | number | 10 | Default element per page
| elementPerPageList | number[] | [20, 50, 100, 200] | Element per page range |
| displayGlobalSearchInput | boolean | false | show/hide global search input |
| searchText | string | Search | The search text placeholder |
| paginationPreviousText | string | << | The text to display on "previous page" button if icon not define |
| paginationNextText | string | << | The text to display on "next page" button if icon not define |
| paginationPreviousIcon | string | <empty string> | The icon (class or image) to display on "previous page" button |
| paginationNextIcon | string | <empty string> | The icon (class or image) to display on "next page" button |
| colorVariationLineBreak | number | 2 | Change the font of a line every 2 (by default) occurrences. If the value is 0, the background of any line will not change |
| height | string | <empty string> | Table max height.Don't forget the unit: px, rem, etc. |

**Outputs**

| Name | $event Type | Description |
|  --  |      --     |      --     |
| onClickActionButton | ActionButtonTable | Fire on user clicks action button |
| onPageChanged | number | Fire on user clicks on a given page. The index of a page starts at 1.|
| onElementPerPageChanged | number | Fire on user changes element per page in select tag |
| onGlobalSearchRequest | string | Fire on user press enter after type text in global search input |

**ColumnTable Object**

| Property | Type | Description |
|    --    |  --  |      --     |
| title | string | The title of the column in the table |
| nameProperty | string | The name of the property in an element of the data array (data input). Supported value: Text, Html |
| display | boolean | Toggle the display of columns according to your needs (example: display of a column according to the role of a user) |
| width | string | The width of the column. Don't forget the unit: px, rem, etc. |

| Method | Parameter type | Description |
|    --    |  --  |      --     |
| customCell | (cellData: any, data?: any) => CellData or string | Define a custom cell to display. You can return html according your need. |

**CellData Object**

| Property | Type | Description |
|    --    |  --  |      --     |
| value | string | The data that will be displayed. |
| researchData | string | The data to use to arrange or filter the column. |
| original | any | The original or raw data. |

| Method | Parameter type | Description |
|    --    |  --  |      --     |
| valueOf | (obj: any) => CellData | Transform an Object to CellData Object. |

**ActionButtonTable Object**

| Property | Type | Description |
|    --    |  --  |      --     |
| key | string | The unique key to distinct each action button |
| html | string | The button html to display |
| icon | string | The button image or a style class (fa fa-users) if no html define |
| text | string | The button text to display if no icon define |
| tooltip | string | Text to display when mouse over button. Defaults to the value of the text property. |
| targetData | any | The element where the action button is located |
| target | number | Index of the selected element according to the array of input data. |
| cssValue | string | Custom classes to the button. Classes are added to the button. To add multiple classes, the value should be space separated class names. |


| Method | Parameter type | Description |
|    --    |  --  |      --     |
| displayCondition | (data: any) => boolean | Define a condition to display the button according to an element of the input data array. By default, action buttons are always displayed. |

## Features

- Responsive table
- Reactive table
- Filtering
- Sorting
- Pagination
- Easy customization



## License

The MIT License (MIT)

Copyright (c) 2022

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## Authors

- [@Eric Njinang](mailto:eric.njinang@gmail.com)
- [@Klaus Laghom](mailto:laghomklaus@yahoo.fr)

