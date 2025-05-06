#  <div align="center"><img src="https://github.com/jallenmanaloto/levi/blob/704e2e1dd4378aac9f92bfed5b243f569d6775e6/src-tauri/icons/128x128@2x.png" width="100" height="100"><br><span style="font-size: 72px;">Levi - Your Task and Note Manager</span>
</div>

## Description

Levi is a Tauri application designed to help you manage your tasks and notes efficiently. This initial release (v0.1.0) provides basic CRUD (Create, Read, Update, Delete) operations for both tasks and notes, along with a search function for quickly finding specific tasks.

## Features

* **Task Management:**
    * Add tasks to your to-do list.
    * Delete tasks you've completed or no longer need.
    * Update task details (e.g., mark as complete, edit description).
    * Retrieve and view all your tasks.
    * Search for specific tasks using the search bar.
* **Note Management:**
    * Add notes.
    * Delete notes.
    * Update note content.
    * Retrieve and view all your notes.

## Installation

*(Provide detailed installation instructions here.  Since this is a Tauri app, you'll want to cover the basics, and any platform-specific steps)*

1.  **Prerequisites:**
    * [Rust](https://www.rust-lang.org/tools/install)
    * [Node.js](https://nodejs.org/en/download/)
    * Tauri CLI:  `npm install -g @tauri-apps/cli`

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/jallenmanaloto/levi/
    cd levi
    ```

3.  **Install dependencies:**
       ```bash
       npm install
       ```

4.  **Build the application:**
    ```bash
    tauri build
    ```

5.  **Run the application:**
    ```bash
    tauri dev
    ```

## Usage

*(Provide instructions on how to use the application.  Describe the user interface and the main workflows)*

1.  **Running the app:** After building, the executable will be in  `./src-tauri/target/release` (or a platform-specific location).  Run this executable.
2.  **Task Management:**
        * Use the interface to add, delete, update, and view your tasks.
        * Use the search bar to find specific tasks.
3.  **Note Management:**
        * Use the interface to add, delete, update, and view your notes.

##  Known Issues

* As this is the initial release (v0.1.0), there may be undiscovered bugs. Please report any issues you encounter on the [GitHub issue tracker](https://github.com/jallenmanaloto/levi//issues).
