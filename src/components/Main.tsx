import React from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { increment, decrement, incrementAsync } from '@root/redux/slices/counter.slice';
import { getUsers, getUser } from '@redux/slices/user.slice';

type Props = {};

function Main(props: Props) {
  const counter = useAppSelector((state) => state.counter.value);
  const users = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleIncrementAsync() {
    dispatch(incrementAsync({ name: 'increment' }));
  }

  function handleGetUsers() {
    dispatch(getUsers());
  }

  function handleGetUser() {
    dispatch(getUser({ id: 0 }));
  }

  console.log(users);

  return (
    <main>
      <div className="col-container">
        <div className="col-1">{counter}</div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>

        <button onClick={handleIncrementAsync}>+</button>

        <button onClick={handleGetUsers}>handleGetUsers</button>
        <button onClick={handleGetUser}>handleGetUser</button>
        <div className="col-2"> </div>
        <div className="col-3"> </div>
      </div>
    </main>
  );
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
