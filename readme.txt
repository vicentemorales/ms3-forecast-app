| MS3 - Forecast/Inventory App|

-- Description -- 

-The purpose of this app is to be able to create weekly inventory/breakdowns of items. 
-The weekly breakdowns should be able to detail quantities forecasted and completed.
-There shoudl be a way to submit completed quantities and display the difference of what's pending.
-The app is planned to work for a food manufacturing set up (clients, SKU)
-If possible, each client and sku should have description of the items.
-If possible, there should be a visual representation of the completed quantities (status bar, etc.)
-The app should be able to handle items that were not initially planned on the breakdown and present the completed quatities. 

-- Weekly breakdown --

The weekly break down should be displayed by the stating Sunday date of the weekly
EXAMPLE: 

| wk of 9.10.23 |
| wk of 9.17.23 |
| wk of 9.24.23 |
| wk of 10.1.23 |

Upon selecting the desired week, of the registered client producing that week should be displayed.

                sku name    |  forecasted quant |   completed quant |   pending quant   |
|           |   SKU1        |   1213            |   1213            |   0               |
| Client 1  |   SKU2        |   ----            |   2000            |   -1213           |
|           |   SKU3        |   900             |   900             |   0               |
|           |   SKU4        |   2658            |   3000            |   -342            |

                sku name    |  forecasted quant |   completed quant |   pending quant   |
|           |   SKU1        |   1213            |   1213            |   0               |
| Client 2  |   SKU2        |   ----            |   2000            |   -1213           |
|           |   SKU3        |   900             |   900             |   0               |
|           |   SKU4        |   2658            |   3000            |   -342            |