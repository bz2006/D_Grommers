
import React from 'react';
import './OrderDetails.css';

type Props = {
    bookingid:string;
    Gpackage: GroomingPackage
    bookingadrs:Address;
    slot: Slot
    status: string;
    bookingdate:string;
}

type GroomingPackage = {
    pid: string;
    breedname:string;
    packageName: string;
    packageDesc: string;
    services: string[];
    charge: number;
};

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}
type Slot = {
    time: string;
    date: Sdate
}

type Sdate = {
    dayName: string;
    dayNumber: number;
    month: string;
    year: string;
}

const OrderSection: React.FC<Props> = ({bookingid,bookingdate, Gpackage,bookingadrs, slot, status }) => {
    const { dayName, dayNumber, month, year } = slot.date;
    const scheduledDate = `${month} ${dayNumber}, ${year}`;

    const SetBooking = ()=>{
        localStorage.setItem("Singlebooking", JSON.stringify({ status,bookingid,bookingdate,bookingadrs,Gpackage,slot }));
    }

    return (
        <div className=" afm aft agb alt bbt cem cex mb-7 rounded-lg md:w-9/12 sm:w-full ">
            <h3 className="t">Order placed on <time dateTime="2020-12-22">Dec 22, 2020</time></h3>
            <div className="lx zg afm agb aqz byw cby cdc cft">
                <dl className="mb ut yp aap awg bvi cbx cti">
                    <div>
                        <dt className="awk ayb">Grooming On</dt>
                        <dd className="ku axx">{scheduledDate}</dd>
                    </div>
                    <div className="md byq">
                        <dt className="awk ayb">Scheduled Date</dt>
                        <dd className="ku axx"><time dateTime="2020-12-22">{bookingdate}</time></dd>
                    </div>
                    <div>
                        <dt className="awk ayb">Total amount</dt>
                        <dd className="ku awk ayb">₹{Gpackage.charge}.00</dd>
                    </div>
                </dl>
                <div className="ab lx zk cwo" data-headlessui-state="">
                    <div className="lx zg">
                        <button
                            className="fs lx zg aqw axv bla"
                            id="headlessui-menu-button-:rk:"
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-headlessui-state=""
                        >
                            <span className="t">Options for order AT48441546</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="oi sl"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="md cti cwk das dav dbw">
                    <a href={`/my-account/schedules/${bookingid}`} onClick={SetBooking} className="lx zg zl aeb afg agc alt ark asb awg awk axz bbt bik bnc bnh bnt boj">
                        <span>View Schedule</span>
                        <span className="t">AT48441546</span>
                    </a>
                </div>
            </div>
            <h4 className="t">Items</h4>
            <ul role="list" className="acj acn">
                <li className="aqz cft">
                    <div className="lx zg ccj">
                        <div className="nv rx uw adn aea aiq bzg cad">
                            <img
                                src="https://www.odysseyhouse.com.au/wordpress/wp-content/uploads/2018/02/golden-retriever-SQUARE@.jpg"
                                alt="Garment bag with two layers of grey and tan zipper pouches for folded shirts and pants."
                                className="pn tu aqk aql"
                            />
                        </div>
                        <div className="jz ut awg">
                            <div className="awk ayb byt ccr md:text-xl">
                                <h5>Bingo, {Gpackage.breedname}</h5>
                                <p className="lb bxx flex  sm:hidden">
                                    {Gpackage?.packageName}<br />
                                    {scheduledDate}, {slot.time}
                                </p>
                            </div>
                            <p className="md axx byd byq md:text-sm">
                                {Gpackage?.packageName}
                            </p><p className="md axx byd byq  md:text-sm">
                                {Gpackage?.packageDesc}
                            </p>
                            <p className="md axx byd byq  md:text-sm">
                            {scheduledDate}, {slot.time}
                            </p>
                        </div>
                    </div>
                    <div className="lk byt ccr">
                        <div className="lx zg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="of si ayd"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="jt awg awk axx">{status} on {bookingdate}</p>
                        </div>
                        <div className="lk lx zg abq aci acn aft agb avh awg awk bxl bxx cff cic">
                            <div className="lx ut zl"><a href={`/my-account/schedules/${bookingid}`} className="adt ayn bli">View Schedule</a></div>
                            <div className="lx ut zl att"><a href="#" className="adt ayn bli">Schedule Again</a></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OrderSection;
