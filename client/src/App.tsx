import React, { useState, useEffect, useCallback } from 'react'
import './App.scss'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
// TODO remove example routes
import TaskList from './TaskList/TaskList'
import Foo from './Foo/Foo'
import Bar from './Bar/Bar'

function App(): any {
  useEffect(() => {
    // document.addEventListener('DOMContentLoaded', () => {
    // fetch('http://localhost:5000/getAll')
    // .then((res) => res.json())
    // .then((data) => loadHtmlTable(data['data']))
    // })
    // type HtmlSomething = any | null
    // console.log(document.querySelector('table tbody'))
    // const tbody:HtmlSomething = document.querySelector('table tbody')
    // const updateBtn:HtmlSomething = document.querySelector('#update-row-btn')
    // const searchBtn:HtmlSomething = document.querySelector('#search-btn')
    // const searchInput:HtmlSomething = document.querySelector('#search-input')
    // const updateRow:HtmlSomething = document.querySelector('#update-row')
    // const updateRowBtn:HtmlSomething = document.querySelector('#update-row-btn')
    // const addBtn:HtmlSomething = document.querySelector('#add-name-btn')
    // if (tbody) {
    //   tbody.addEventListener('click', (e: any) => {
    //     if (e.target.className === 'delete-row-btn') {
    //       deleteRowById(e.target.dataset.id)
    //     }
    //     if (e.target.className === 'edit-row-btn') {
    //       handleEditRow(e.target.dataset.id)
    //     }
    //   })
    // }
    // const deleteRowById = (id: any) => {
    //   fetch('http://localhost:5000/delete/' + id, {
    //     method: 'DELETE',
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success) {
    //         // location.reload()
    //         alert('good')
    //       }
    //     })
    // }
    // searchBtn.addEventListener('click', () => {
    //   const searchValue:any | null = searchInput.value
    //   fetch('http://localhost:5000/search/' + searchValue)
    //     .then((res) => res.json())
    //     .then((data) => loadHtmlTable(data['data']))
    // })
    // const handleEditRow = (id:any) => {
    //   updateRow.hidden = false
    //   updateRowBtn.dataset.id = id
    // }
    // updateBtn.addEventListener('click', (e:any) => {
    //   const updateNameInput:HtmlSomething = document.querySelector('#update-name-input')
    //   fetch('http://localhost:5000/update', {
    //     method: 'PATCH',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify({
    //       id: e.target.dataset.id,
    //       name: updateNameInput.value,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success) {
    //         // location.reload()
    //         alert("Good")
    //       }
    //     })
    // })
    // addBtn.addEventListener('click', () => {
    //   const nameInput:HtmlSomething = document.querySelector('#name-input')
    //   const name = nameInput.value
    //   nameInput.value = ''
    //   fetch('http://localhost:5000/insert', {
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       name,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => insertRowIntoTable(data['data']))
    // })
    // const insertRowIntoTable = (data:any) => {
    //   console.log(data, 123)
    //   const table:HtmlSomething = document.querySelector('table tbody')
    //   const isTableData = table.querySelector('.no-data')
    //   let tableHtml = `<tr>`
    //   for (const key in data) {
    //     if (Object.hasOwnProperty.call(data, key)) {
    //       if (key === 'dateAdded') {
    //         data[key] = new Date(data[key].toLocaleString())
    //       }
    //       tableHtml += `<td>${data[key]}</td>`
    //     }
    //   }
    //   tableHtml += `<td><button class="delete-row-btn" data-id="${data.id}">Delete</button></td>`
    //   tableHtml += `<td><button class="edit-row-btn" data-id="${data.id}">Edit</button></td>`
    //   tableHtml += `</tr>`
    //   if (isTableData) {
    //     table.innerHTML = tableHtml
    //   } else {
    //     const newRow = table.insertRow()
    //     newRow.innerHTML = tableHtml
    //   }
    // }
    // function loadHtmlTable(data:any) {
    //   const table:HtmlSomething = document.querySelector('table tbody')
    //   console.log(data)
    //   if (data.length == 0) {
    //     table.innerHTML =
    //       "<tr><td class='no-data' colspan='5'>No Data</td></td></tr>"
    //     return
    //   }
    //   let tableHtml = ''
    //   data.forEach(({ id, name, date_added }:any) => {
    //     tableHtml += '<tr>'
    //     tableHtml += `<td>${id}</td>`
    //     tableHtml += `<td>${name}</td>`
    //     tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`
    //     tableHtml += `<td><button class="delete-row-btn" data-id="${id}">Delete</button></td>`
    //     tableHtml += `<td><button class="edit-row-btn" data-id="${id}">Edit</button></td>`
    //     tableHtml += `</tr>`
    //   })
    //   table.innerHTML = tableHtml
    // }
  }, [])
  const [count, setCount] = useState(0);
  const callback = useCallback((count) => {
    setCount(count);
  }, []);
  return (
    <div className="App d-flex">
      <h2>count {count}</h2>
      {/* <main>
        <label htmlFor="name-input">Name:</label>
        <input
          type="text"
          name="name-input"
          id="name-input"
          placeholder="Name"
        />
        <button id="add-name-btn">Add Name</button>

        <br />
        <br />
        <br />
        <div>
          <input type="text" placeholder="Search by name" id="search-input" />
          <button id="search-btn">Search</button>
        </div>

        <table id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date Added</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <section hidden id="update-row">
          <label htmlFor="update-name-input">Update Name:</label>
          <input type="text" id="update-name-input" />
          <button id="update-row-btn">Update</button>
        </section>
      </main> */}

      <Router>
        <LeftPanel />
        {/* //TODO remove example routes */}
        <Switch>
          <Route exact path="/" component={TaskList} />
          <Route exact path="/foo" component={Foo} />
          <Route exact path="/bar" component={Bar} />
        </Switch>
        <RightPanel parentCallback={callback} />
      </Router>
    </div>
  )
}

export default App
