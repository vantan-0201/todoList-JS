import html from "../core.js";
import { connect } from "../store.js";

function TodoItem({ todo, index, editIndex }) {
  return html`
    <li
      class="${todo.complete && "completed"} ${editIndex === index &&
      "editing"} "
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${todo.complete && "checked"}
          onchange="dispatch('toggle',${index})"
        />
        <label for="edit_${index}" ondblclick="dispatch('startEdit',${index})"
          >${todo.title}</label
        >
        <button class="destroy" onclick="dispatch('destroy',${index})"></button>
      </div>
      <input
        id="edit_${index}"
        class="edit"
        value="${todo.title}"
        onkeyup="event.keyCode ===13 && dispatch('endEdit',this.value.trim()) || event.keyCode ===27 && dispatch('cancelEdit')"
        onblur="dispatch('endEdit',this.value.trim())"
        autofocus
      />
    </li>
  `;
}

export default connect()(TodoItem);
