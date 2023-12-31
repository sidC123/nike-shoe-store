import Button from "@/components/button/Button"

const Subscription = () => {
    return (
        <section className="flex justify-between items-center max-container max-lg:flex-col gap-10" id="contact-us">
            <h3 className="text-4xl font-bold leading-[68px] lg:max-w-md font-Jost">Sign Up for <span className="text-primary">Updates</span> & Newsletter</h3>
            <div className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
                <input type="text" placeholder="subscribe at Nike" className="input " />
                <div className="flex max-sm:justify-end max-sm:w-full items-center">
                    <Button label="Sign Up" fullwidth />
                </div>
            </div>
        </section>
    )
}

export default Subscription;