export default function Login() {
	return `
        <section class="section flex-center gap-8 flex-col">
            <c-title
                data-title="ورود به پنل مدیریت"
                data-sub-title="لطفاً اطلاعات حساب کاربری خود را وارد کنید">
            </c-title>
            <div class="form-control w-full max-w-md">
                <form
                    novalidate
                    id="login-form"
                    name="login-form"
                    class="login-form">
                    <c-input
                        data-type="email"
                        data-id="email"
                        data-label="ایمیل"
                        data-tooltip="ایمیل خود را وارد کنید"></c-input>
                    <c-input
                        data-type="password"
                        data-id="password"
                        data-label="رمز عبور"
                        data-tooltip="رمز عبور خود را وارد کنید"></c-input>
                    <c-button
                        data-value="ورود"
                        data-type="submit"></c-button>
                </form>
            </div>
        </section>
    `;
}
