<template>
    <div class='current-user-container'>
        <div id='enter-button'>
            <button class="pure-button button-xsmall">
                Войти
            </button>
        </div>
        <div id='current-user-info'>
            <div id='info'></div>
            <div id='exit-button'>
                <button class="pure-button button-xsmall">
                    Выйти
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import store, {
        USER_ENTER,
        USER_EXIT
    } from '../reduxStore';

    class CurrentUserComponent {
        constructor(buttonEl, exitBtn, infoEl, container, store) {
            this.buttonEl = buttonEl;
            this.exitBtn = exitBtn;
            this.buttonEl.addEventListener('click', this.onUserEnter.bind(this));
            this.exitBtn.addEventListener('click', this.onUserExit.bind(this));

            this.containerEl = container;
            this.infoEl = infoEl;
            this.store = store;
            this.store.subscribe(this.render.bind(this));
        }

        onUserEnter(event) {
            this.store.dispatch({
                type: USER_ENTER
            })
        }

        onUserExit(event) {
            this.store.dispatch({
                type: USER_EXIT
            })
        }

        render() {
            const state = this.store.getState();
            if (state.user.name) {
                this.buttonEl.style.display = 'none';
                this.infoEl.innerHTML = state.user.name;
                this.infoEl.style.display = 'block';
                this.containerEl.style.display = 'block';
            } else {
                this.buttonEl.style.display = 'block';
                this.containerEl.style.display = 'none';
            }
        }
    }

    export default {
        name: 'CurrentUser',
        mounted() {
            const enterBtn = document.getElementById('enter-button');
            const exitBtn = document.getElementById('exit-button');
            const infoContainer = document.getElementById('current-user-info');
            const info = document.getElementById('info');
            const comp = new CurrentUserComponent(
                enterBtn, exitBtn, info, infoContainer, store
            );
            comp.render();
        }
    }
</script>
