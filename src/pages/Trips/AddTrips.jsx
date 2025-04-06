import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwitchButton from '../../ui/SwitchButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Inputfiltter from '../../ui/Inputfiltter';
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import 'react-date-picker/dist/DatePicker.css';
import Calendar from 'react-calendar';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
const AddTrips = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tripName, setTripName] = useState('');
  const [busId, setBusId] = useState('');
  const [pickupStationId, setPickupStationId] = useState('');
  const [dropoffStationId, setDropoffStationId] = useState('');
  const [cityId, setCityId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [countryId, setCountryId] = useState('');
  const [toCountryId, setToCountryId] = useState('');
  const [toCityId, setToCityId] = useState('');
  const [toZoneId, setToZoneId] = useState('');
  const [date, setDate] = useState("");
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState("inactive");
  const [agentId, setAgentId] = useState('');
  const [maxBookDate, setMaxBookDate] = useState();
  const [type, setType] = useState('');
  const [fixedDate, setFixedDate] = useState();
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [cancellationPayAmount, setCancellationPayAmount] = useState('');
  const [cancellationPayValue, setCancellationPayValue] = useState('');
  const [minCost, setMinCost] = useState('');
  const [tripType, setTripType] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [cancellationDate, setCancellationDate] = useState();

  const [edit, setEdit] = useState(false);
  
  // };
  const [errors, setErrors] = useState({
    tripName: '',
    busId: '',
    pickupStationId: '',
    dropoffStationId: '',
    cityId: '',
    zoneId: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: '',
    countryId: '',
    toCountryId: '',
    toCityId: '',
    toZoneId: '',
    date: '',
    price: '',
    status: '',
    agentId: '',
    maxBookDate: '',
    type: '',
    fixedDate: '',
    cancellationPolicy: '',
    cancellationPayAmount: '',
    cancellationPayValue: '',
    minCost: '',
    tripType: '',
    currencyId: '',
    cancellationDate: ''
  });

  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setTripName(snedData.trip_name);
      setBusId(snedData.bus_id);
      setPickupStationId(snedData.pickup_station_id);
      setDropoffStationId(snedData.dropoff_station_id);
      setCityId(snedData.city_id);
      setZoneId(snedData.zone_id);
      setDepartureTime(snedData.deputre_time);
      setArrivalTime(snedData.arrival_time);
      setAvailableSeats(snedData.avalible_seats);
      setCountryId(snedData.country_id);
      setToCountryId(snedData.to_country_id);
      setToCityId(snedData.to_city_id);
      setToZoneId(snedData.to_zone_id);
      setDate(snedData.date);
      setPrice(snedData.price);
      setStatus(snedData.status);
      setAgentId(snedData.agent_id);
      setMaxBookDate(snedData.max_book_date);
      setType(snedData.type);
      setFixedDate(snedData.fixed_date);
      setCancellationPolicy(snedData.cancellation_policy);
      setCancellationPayAmount(snedData.cancelation_pay_amount);
      setCancellationPayValue(snedData.cancelation_pay_value);
      setMinCost(snedData.min_cost);
      setTripType(snedData.trip_type);
      setCurrencyId(snedData.currency_id);
      setCancellationDate(snedData.cancelation_date);
      setEdit(true);
    }
  }, [location.state]);

  const handleChangetwo = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setToCountryId(value);
    if (name === 'cities') setToCityId(value);
    if (name === 'zones') setToZoneId(value);
    if (name === 'stations') setDropoffStationId(value);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'trip_name') setTripName(value);
    if (name === 'cities') setCityId(value);
    if (name === 'countries') setCountryId(value);
    if (name === 'zones') setZoneId(value);
    if (name === 'stations') setPickupStationId(value);


    //
    // if (name === 'deputre_time') setDepartureTime(value);
    // if (name === 'arrival_time') setArrivalTime(value);
    if (name === 'avalible_seats') setAvailableSeats(value);
    //

    // if (name === 'date') setDate(value);
    if (name === 'price') setPrice(value);
    if (name === 'status') setStatus(value);
    if (name === 'operators') setAgentId(value);
    // if (name === 'max_book_date') setMaxBookDate(value);
    if (name === 'Limit') setType(value);
    // if (name === 'fixed_date') setFixedDate(value);
    if (name === 'cancellation_policy') setCancellationPolicy(value);
    if (name === 'two') setCancellationPayAmount(value);
    if (name === 'cancelation_pay_value') setCancellationPayValue(value);
    if (name === 'min_cost') setMinCost(value);
    if (name === 'three') setTripType(value);
    if (name === 'currencies') setCurrencyId(value);
    // if (name === 'cancelation_date') setCancellationDate(value);
    //done
    if (name === 'busses') setBusId(value);
    //may daone
  };

  const validateForm = () => {
    let formErrors = {};

    if (!tripName) formErrors.tripName = 'Trip name is required';
    if (!busId) formErrors.busId = 'Bus ID is required';
    if (!pickupStationId) formErrors.pickupStationId = 'Pickup station ID is required';
    if (!dropoffStationId) formErrors.dropoffStationId = 'Dropoff station ID is required';
    if (!cityId) formErrors.cityId = 'City ID is required';
    if (!zoneId) formErrors.zoneId = 'Zone ID is required';
    if (!departureTime) formErrors.departureTime = 'Departure time is required';
    if (!arrivalTime) formErrors.arrivalTime = 'Arrival time is required';
    if (!availableSeats) {
      formErrors.availableSeats = 'Available seats are required';
    } else if (isNaN(availableSeats)) {
      formErrors.availableSeats = 'Available seats must be a number';
    }
    if (!countryId) formErrors.countryId = 'Country ID is required';
    if (!toCountryId) formErrors.toCountryId = 'To country ID is required';
    if (!toCityId) formErrors.toCityId = 'To city ID is required';
    if (!toZoneId) formErrors.toZoneId = 'To zone ID is required';
    if (!date) formErrors.date = 'Date is required';
    if (!price) formErrors.price = 'Price is required';
    if (!agentId) formErrors.agentId = 'Agent ID is required';
    if (!maxBookDate) formErrors.maxBookDate = 'Max book date is required';
    if (!type) formErrors.type = 'Type is required';
    if (!fixedDate) formErrors.fixedDate = 'Fixed date is required';
    if (!cancellationPolicy) formErrors.cancellationPolicy = 'Cancellation policy is required';
    if (!cancellationPayAmount) formErrors.cancellationPayAmount = 'Cancellation pay amount is required';
    if (!cancellationPayValue) formErrors.cancellationPayValue = 'Cancellation pay value is required';
    if (!minCost) formErrors.minCost = 'Min cost is required';
    if (!tripType) formErrors.tripType = 'Trip type is required';
    if (!currencyId) formErrors.currencyId = 'Currency ID is required';
    if (!cancellationDate) formErrors.cancellationDate = 'Cancellation date is required';


    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    // Update errors state
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleDatePickerChange = (newData) => {
    if (newData) {
      const day = newData.getDate() + 1;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setDate(formattedDate);
    } else {
      setDate("");
    }
  };
  const handlemaxBookDate = (newData) => {
    if (newData) {
      const day = newData.getDate() + 1;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setMaxBookDate(formattedDate);
    } else {
      setMaxBookDate("");
    }
  };

  const handlehandlemaxBookDate = (newData) => {
    if (newData) {
      const day = newData.getDate() + 1;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setFixedDate(formattedDate);
    } else {
      setFixedDate("");
    }
  };
  const handleCancellationDate = (newData) => {
    if (newData) {
      const day = newData.getDate() + 1;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setCancellationDate(formattedDate);
    } else {
      setCancellationDate("");
    }
  };

  const handledepartureTime = (newTime) => {
    if (newTime) {
      const formattedTime = newTime;
      console.log("Departure Time: ", formattedTime);
      setDepartureTime(formattedTime);
    } else {
      setDepartureTime(""); // في حالة حذف الوقت
    }
  };

  const handlearrivalTime = (newTime) => {
    if (newTime) {
      const formattedTime = newTime; // TimePicker سيعيد الوقت بتنسيق HH:mm
      setArrivalTime(formattedTime);
    } else {
      setArrivalTime(""); // في حالة حذف الوقت
    }
  };


  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');

    const newTrip = {
      trip_name: tripName,
      bus_id: busId,
      pickup_station_id: pickupStationId,
      dropoff_station_id: dropoffStationId,
      city_id: cityId,
      zone_id: zoneId,
      deputre_time: departureTime,
      arrival_time: arrivalTime,
      avalible_seats: availableSeats,
      country_id: countryId,
      to_country_id: toCountryId,
      to_city_id: toCityId,
      to_zone_id: toZoneId,
      date,
      price,
      status,
      agent_id: agentId,
      max_book_date: maxBookDate,
      type,
      fixed_date: fixedDate,
      cancellation_policy: cancellationPolicy,
      cancelation_pay_amount: cancellationPayAmount,
      cancelation_pay_value: cancellationPayValue,
      min_cost: minCost,
      trip_type: tripType,
      currency_id: currencyId,
      cancelation_date: cancellationDate,
    };

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/trip/update/${snedData.id}`, newTrip, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Trip updated successfully:', response.data);
          toast.success('Trip updated successfully');
          setTimeout(() => {
            navigate('/Trips');
          }, 3000);
        })
        .catch(error => {
          console.error('Error updating trip:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/trip/add', newTrip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Trip added successfully:', response.data);
        toast.success('Trip added successfully');

        setTimeout(() => {
          navigate('/Trips');
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding trip:', error);
      });

    setTripName('');
    setBusId('');
    setPickupStationId('');
    setDropoffStationId('');
    setCityId('');
    setZoneId('');
    setDepartureTime('');
    setArrivalTime('');
    setAvailableSeats('');
    setCountryId('');
    setToCountryId('');
    setToCityId('');
    setToZoneId('');
    setDate('');
    setPrice('');
    setStatus('');
    setAgentId('');
    setMaxBookDate('');
    setType('');
    setFixedDate('');
    setCancellationPolicy('');
    setCancellationPayAmount('');
    setCancellationPayValue('');
    setMinCost('');
    setTripType('');
    setCurrencyId('');
    setCancellationDate('');
    setEdit(false);
  };


  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>
      <AddAll navGo='/Trips' name='add Trips' />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField
          placeholder="Trip Name"
          name="trip_name"
          value={tripName}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="Country "
          name="countries"
          value={countryId}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          placeholder="City "
          name="cities"
          value={cityId}
          onChange={handleChange}
          shara={countryId}
          required
        />
        <Inputfiltter
          placeholder="Zone "
          name="zones"
          value={zoneId}
          onChange={handleChange}
          shara={cityId}
          required
        />
        <Inputfiltter
          placeholder="Pickup Station"
          name="stations"
          shara={zoneId}
          value={pickupStationId}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="To Country"
          name="countries"
          value={toCountryId}
          onChange={handleChangetwo}
          required
        />
        <Inputfiltter
          placeholder="To City "
          name="cities"
          value={toCityId}
          onChange={handleChangetwo}
          shara={toCountryId}
          required
        />
        <Inputfiltter
          placeholder="To Zone "
          name="zones"
          value={toZoneId}
          shara={toCityId}
          onChange={handleChangetwo}
          required
        />
        <Inputfiltter
          placeholder="Dropoff Station"
          name="stations"
          shara={toZoneId}
          value={dropoffStationId}
          onChange={handleChangetwo}
          required
        />

        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10'>
          <span>departureTime</span>
          <TimePicker
            onChange={handledepartureTime}
            value={departureTime}
            format="HH:mm"
            disableClock={true}
          />
        </div>
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10'>
          <span>arrivalTime</span>
          <TimePicker
            onChange={handlearrivalTime}
            value={arrivalTime}
            format="HH:mm"
            disableClock={true}
            disableCalendar={false}
          />
        </div>

        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10'>
          <span>date</span>
          <DatePicker
            onChange={handleDatePickerChange}
            value={date}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
          />
        </div>
        <InputField
          placeholder="Available Seats"
          name="avalible_seats"
          value={availableSeats}
          onChange={handleChange}
          required
        />

        <InputField
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />


        <InputArrow
          placeholder="Agent "
          name="operators"
          value={agentId}
          onChange={handleChange}
          required
        />
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-2'>
          <span>Max Book Date</span>
          <DatePicker
            onChange={handlemaxBookDate}
            value={maxBookDate}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
          />
        </div>

        <Inputfiltter
          placeholder="Type"
          name="Limit"
          value={type}
          onChange={handleChange}
          required
        />
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-2'>
          <span>Fixed Date</span>
          <DatePicker
            onChange={handlehandlemaxBookDate}
            value={fixedDate}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
          />
        </div>


        <InputField
          placeholder="Cancellation Policy"
          name="cancellation_policy"
          value={cancellationPolicy}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          placeholder="Cancellation Pay Amount"
          name="two"
          value={cancellationPayAmount}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Cancellation Pay Value"
          name="cancelation_pay_value"
          value={cancellationPayValue}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Min Cost"
          name="min_cost"
          value={minCost}
          onChange={handleChange}
          required
        />
        <Inputfiltter
          placeholder="Trip Type"
          name="three"
          value={tripType}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="Currency"
          name="currencies"
          value={currencyId}
          onChange={handleChange}
          required
        />
        <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-0'>
          <span>Cancellation Date </span>
          <DatePicker
            onChange={handleCancellationDate}
            value={cancellationDate}
            format="dd-MM-yyyy"
            disableClock={true}
            disableCalendar={false}
          />
        </div>

        {/* done */}
        <InputArrow
          placeholder="bus "
          name="busses"
          value={busId}
          onChange={handleChange}
          required
        />
        <SwitchButton value={status} setValue={setStatus} />
        {/* may daone */}


      </div>

      <div className="flex gap-3">
        <button onClick={handleSave}>
          <img className="my-6" src={picdone} alt="Save" />
        </button>

      </div>
      <ToastContainer />
    </div>
  )
}

export default AddTrips
