/*
    Carriage Crossing Pharmacy Booker
    Copyright (C) 2020 Luke Zhang, Ethan Lim

    https://luke-zhang-04.github.io/
    https://github.com/ethanlim04

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Add a background to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scroll() {
    var navbar = document.querySelector(".navbar")
    if (window.pageYOffset >= 100) {
        navbar.classList.remove("override-bg-default")
        navbar.classList.remove("override-bg-none")
        navbar.classList.add("override-bg-light")
    } else {
        navbar.classList.remove("override-bg-light")
        navbar.classList.add("override-bg-none")
    }
}

window.onscroll = () => {
    scroll()
};