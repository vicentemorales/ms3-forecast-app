| MS3 - Forecast/Inventory App|

-- Description -- 

-The purpose of this app is to be able to create weekly inventory/breakdowns of items. 
-The weekly breakdowns should be able to detail quantities forecasted and completed.
-There shoudl be a way to submit completed quantities and display the difference of what's pending.
-The app is planned to work for a food manufacturing set up (clients, SKU)
-If possible, each client and sku should have description of the items.
-If possible, there should be a visual representation of the completed quantities (status bar, etc.)
-The app should be able to handle items that were not initially planned on the breakdown and present the completed quatities. 
- There should eb a way to select the SKU that was completed and provide quatr
-

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


---- 9/19/23 changes update ----

The overall concept remains the same but changes to the design have been made. 
- Instead of a list of customer and quantities:
    - Clients will be listed in individual divs.
    - Under the clients name a list of pending items will be present
    - To the right of the client names/pending items  there will  be a div that contains tile for each of the skus.
        - The tiles will display every sku (even the ones that are not oending and will serve as "buttons")
    - As a sku tile is pressed, the visitor will be presented with a form that where they will be able to submit a quant produced.

- After submitting a quanitity, the submission should be logged.
    - this logged submission should show the client, item description, quantity, notes, and name of person who produced it.
        -this log should be editable/deletable incase errors are made during the submission phase