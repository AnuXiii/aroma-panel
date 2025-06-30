export default function Menu() {
	return `
        <section class="section flex-col gap-8">
            <c-title
                data-title="افزودن منو"
                data-back="true"></c-title>
            <div class="form-control">
                <form
                    novalidate
                    id="menu"
                    name="menu"
                    data-end="menu"
                    class="form">
                    <c-input
                        data-type="text"
                        data-id="menu-title"
                        data-label="متن منو"
                        data-tooltip="متن دسته بندی را وارد کنید"></c-input>
                    <c-input
                        data-type="text"
                        data-id="menu-category-name"
                        data-label="نام دسته بندی (به انگلیسی)"
                        data-tooltip="نام دسته بندی باید انگلیسی و بهم پیوسته باشد مثال (summerDrinks)"></c-input>
                    <c-input
                        data-type="file"
                        data-id="menu-img"
                        data-label="تصویر خود را آپلود کنید"></c-input>
                    <c-button
                        data-value="ارسال"
                        data-type="submit"></c-button>
                </form>
            </div>
        </section>
    `;
}
