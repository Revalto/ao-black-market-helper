
Description
===========

Black Market Assistant. An example of using ao-network (https://github.com/Revalto/ao-network)

The point of this application is that the program itself calculates the profit and remembers the profitable offers. You just have to click the mouse and move between the markets


Instructions
===========

1. Launch the application
2. Open the black market menu
3. Choosing the filters you need
4. We click on all items on the icon (information about the item)
5. In case the estimated market value is lower than the prices on the black market, we will see this item in the appendix
6. Go to Caerleon Market and shop


Requirements
============

* [node.js](http://nodejs.org/) -- v4.0.0 or newer

* For Windows: [Npcap with WinPcap compatibility](https://nmap.org/npcap/)

* For *nix: libpcap and libpcap-dev/libpcap-devel packages


Install
============

    npm i
    npx electron-rebuild
    npm start