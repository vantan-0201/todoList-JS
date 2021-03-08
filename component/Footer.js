import html from "../core.js";
import { connect } from "../store.js";

function Footer({ todos, filters, filter }) {
  return html`
    <footer class="footer">
      <span class="todo-count"
        ><strong>${todos.filter(filters[filter]).length}</strong> item</span
      >
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        ${Object.keys(filters).map(
          (type) => html`
            <li>
              <a
                class="${filter === type && "selected"}"
                href="#"
                onclick="dispatch('switchFilter','${type}')"
                >${type[0].toLocaleUpperCase() + type.slice(1)}</a
              >
            </li>
          `
        )}
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      ${todos.filter((todo) => todo.complete).length > 0 &&
      html`
        <button class="clear-completed" onclick="dispatch('clearComplete')">
          Clear completed
        </button>
      `}
    </footer>
  `;
}

export default connect()(Footer);
