# WEB103 Project 3 - Twin Cities Coffee Community Space

Submitted by: **Devon Ek**

About this web app: **A virtual community space for Twin Cities coffee shops — browse locations like Spyhouse, Dogwood, Quixotic, and Five Watt Coffee, and discover upcoming events at each one. Events include countdowns and are visually distinguished once they've passed.**

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**

    ![Render Database Dashboard](render.png)

  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**

    ![SELECT * FROM locations](locations.png)

    ![SELECT * FROM events](events.png)
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Location cards feature Unsplash cover images with animated hover overlays
- [x] Responsive layout — single column on mobile, two columns on desktop
- [x] Past events show a darkened card with a red "ago" timestamp badge using Font Awesome icons
- [x] All events page includes a dropdown to filter events by location in real time

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='coffeetc.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [LICEcap](https://www.cockos.com/licecap/)
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

- Setting up the Render PostgreSQL connection required ensuring `PGHOST` contained only the hostname, not the full connection URL.
- Implementing the countdown timer required careful date/time parsing to correctly compare event dates against the current time.
- The filter on the All Events page is handled client-side after fetching all events, keeping the UI snappy without extra API calls.

## License

Copyright [2026] [Devon Ek]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
