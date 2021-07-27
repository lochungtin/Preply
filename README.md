# Preply

Lightweight Todolist + Note-Taking App build with React Native, backend powered by Google Firebase (Realtime Database). With features such as tag sorting system, data syncing, and other useful utilities built in into the app.

## Table of Contents
<details>
<summary>
    <b>
        Click to expand
    </b>
</summary>

- [Preply](#preply)
  - [Table of Contents](#table-of-contents)
  - [Todos](#todos)
    - [Sorting](#sorting)
    - [Filtering](#filtering)
  - [Notes](#notes)
  - [Utilities](#utilities)
    - [Calculator](#calculator)
    - [Unit Converter](#unit-converter)
  - [Account](#account)
    - [Merge Options](#merge-options)
      - [Option I - (Local overwrites cloud)](#option-i---local-overwrites-cloud)
      - [Option II - (Cloud overwrites local)](#option-ii---cloud-overwrites-local)
      - [Option III - (Compare and merge)](#option-iii---compare-and-merge)

</details>

<a href="todos"></a>

## Todos

|                        Todos                         |                     Todo Input                      |                        Date Picker                         |                        Time Picker                         |
| :--------------------------------------------------: | :-------------------------------------------------: | :--------------------------------------------------------: | :--------------------------------------------------------: |
| <img src='./img/todos.jpg' width='162' height='351'> | <img src='./img/todo.jpg' width='162' height='351'> | <img src='./img/date_select.jpg' width='162' height='351'> | <img src='./img/time_select.jpg' width='162' height='351'> |



<a href="sorting"></a>

### Sorting

<table>
    <tr>
        <td valign='top' width='300' height='351'>
            <img src='./img/todos_sort.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            The default order of display is chronological, if sort mode is on, the order of todo records will be sorted to the default tag order, which is arranaged to the color of the tag category.
        </td>
    </tr>
</table>

<a href="filtering"></a>

### Filtering

<table>
    <tr>
        <td valign='top'>
            <img src='./img/todos_cal.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            <img src='./img/todos_filter.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            text
        </td>
    </tr>
</table>

---

<a href="notes"></a>

## Notes

|                        Notes                         |                      Note Page                      |                     Tag Picker                      |
| :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
| <img src='./img/notes.jpg' width='162' height='351'> | <img src='./img/note.jpg' width='162' height='351'> | <img src='./img/tags.jpg' width='162' height='351'> |

---

<a href="utils"></a>

## Utilities

<a href="cal"></a>

### Calculator

<table>
    <tr>
        <td valign='top'>
            <img src='./img/cal.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            <img src='./img/cal_res.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            text
        </td>
    </tr>
</table>

<a href="unit_conv"></a>

### Unit Converter

<table>
    <tr>
        <td valign='top'>
            <img src='./img/unit_conv.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            <img src='./img/units.jpg' width='162' height='351'>
        </td>
        <td valign='top'>
            text
        </td>
    </tr>
</table>

---

<a href="acc"></a>

## Account

|                        Sign Up                        |                        Sign In                        |                      Reset Password                       |                     Managment                      |
| :---------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------------: | :------------------------------------------------: |
| <img src='./img/signin.jpg' width='162' height='351'> | <img src='./img/signup.jpg' width='162' height='351'> | <img src='./img/reset_pswd.jpg' width='162' height='351'> | <img src='./img/acc.jpg' width='162' height='351'> |

<a href="merge_op"></a>

### Merge Options

#### Option I - (Local overwrites cloud)

- All cloud stored data will be wiped and whatever records is stored in the app will be uploaded to the cloud storage

#### Option II - (Cloud overwrites local)

- All local data will be wiped and whatever is stored on the cloud will be dowloaded and loaded into the local store

#### Option III - (Compare and merge)

- The last modified dates of each record (from cloud and local store) will be compared, and the latest modified will take presences
- The compared and merged result will overwite both local and cloud stores

