const { ipcRenderer } = require('electron');

jQuery(document).ready(() => {
    const itemList = jQuery('div#item-list > div.row');

    ipcRenderer.on('offer:new', (event, arg) => {
        itemList.append(`
            <div id="${arg.itemId}_${arg.quality}" class="col-xl-3 col-lg-6 col-md-6">
                <a href="#">
                    <div class="card-box widget-user widget-crafting-items">
                        <img src="https://render.albiononline.com/v1/item/${arg.uniqueName}.png?count=${arg.amount}&quality=${arg.quality}">
                        <div class="wid-u-info item-title">
                            <p class="mt-0 m-t-20" id="T1_FARM_CARROT_SEED">${arg.name} (x${arg.amount})<br>
                                <span class="badge badge-success" title="Black Market">${arg.offerPrice}</span>
                                <span class="badge badge-warning" title="Caerleon Market">${arg.price}</span>
                                <span class="badge badge-danger" title="Profit">${arg.profit}</span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        `);
    });
});