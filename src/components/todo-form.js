import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useForm} from "react-hook-form";


const TodoForm = (props) => {

    const { register, handleSubmit,formState: {errors}, reset, trigger, } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    let options = ['All', 'Completed', 'Uncompleted']
    const {inputText, setInputText, addTask, setStatus} = props

    const inputTextHandler = (e) => {
        console.log(e);
        setInputText(e.target.value)
    }
    const submitTodoHandler = (e) => {
        e.preventDefault()
        addTask(inputText);
        setInputText("")
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    return (
        <div className="form-group">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    value={inputText}
                    type="text"
                    name="title"
                    {...register("title", {
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                        pattern: {
                            // value: /^[A-Za-z]+$/i,
                            value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                            message: "Only letters and numbers are allowed",
                        }
                    })}
                    onChange={inputTextHandler}
                    onKeyUp={() => {
                        trigger("title");
                    }}
                />
                <div>
                    {errors.title && (
                        <span>{errors.title.message}</span>
                    )}
                </div>
                <button disabled={inputText.length < 1} onClick={submitTodoHandler} type="submit"
                        className="todo-button">
                    <FontAwesomeIcon icon={faPlus} size={'xs'}/>
                </button>
                <div className="select">
                    <select onChange={statusHandler} name="todo" className="filter-todo">
                        {options.map((el) => (
                            <option key={el}>{el}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
export default TodoForm