import React from "react";

const Magazine = () => {
    return (
        <div className="container">
            <h1>Magazine</h1>
            <form>
                <div class="form-group">
                    <label for="pdfLink">Link of pdf</label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Pdf Link"
                    />
                    
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">Image that will show to user</label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Image Link"
                    />
                </div>
                
                <button type="submit" class="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Magazine;
