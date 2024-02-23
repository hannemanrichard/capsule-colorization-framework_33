import Head from "next/head";
import { getDownloadURL, ref } from "firebase/storage";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Sequence from "../components/Sequence";
import CapturedImages from "../components/CapturedImages";
import supabase, { storage } from "../firebase-config";
import { useEffect, useState } from "react";
import axios from "axios";

import { sequence1, sequence2, sequence3 } from "../data/seq";

export default function Home() {
  const [triggerColorize, setTriggerColorize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isColorized, setIsColorized] = useState(false);
  const [limit, setLimit] = useState(5);
  const [selectedSequence, setSelectedSequence] = useState("sequence1");
  const [selectedSequenceImages, setSelectedSequenceImages] =
    useState(sequence1);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    console.log("loading", loading);
    console.log("trigger", triggerColorize);
    console.log("is colorized", isColorized);
    // console.log("selected sequence", selectedSequence);
    // console.log("selected sequence images", selectedSequenceImages);
  }, [
    loading,
    isColorized,
    selectedSequence,
    selectedSequenceImages,
    triggerColorize,
  ]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleIsColorized = (newValue) => {
    setIsColorized(newValue);
  };

  const handleLoading = (newValue) => {
    setLoading(newValue);
  };

  const handleTriggerColorizeChange = (newValue) => {
    setTriggerColorize(newValue);
  };

  const handleLimitChange = (newValue) => {
    setLimit(newValue);
  };

  const handleSequenceChange = (newVal, newSeq) => {
    setSelectedSequence(newVal);
    setSelectedSequenceImages(newSeq);
    setIsColorized(false);
    // console.log(newSeq);
  };

  return (
    <div className="flex">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="How to use this app?">
          {"How to use this app?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Step 1 - Choose a sequence
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Step 2 - Choose an emergency image number
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Step 3 - Click colorize
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
      {/* Sidebar */}
      {/* <Sidebar /> */}
      {/* Content */}
      <div className="w-full min-h-screen">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-center py-8">
          WIRELESS CAPSULE ENDOSCOPY COLORIZATION FRAMEWORK
        </h1>
        <div className="flex sm:justify-center">
          <p className="text-xs text-justify  sm:w-4/5 text-gray-600 sm:px-0 px-8">
            Wireless Capsule Endoscopy (WCE) is the preferred technology for the
            diagnosis and evaluation of small bowel disorders. The concluding
            Wireless Capsule Endoscopy (WCE) video comprises as many as 150,000
            images. Within this extensive collection of images, the majority are
            classified as normal, with only a singular or a few frames
            identified as pathological. The transmission of such a substantial
            volume of data from the WCE is constrained by the device&#39;s
            limited battery capacity. The primary objective of this study is to
            minimize the computational load by shifting the maximum of
            computations at the decoder side while reducing the information
            transmitted from the encoder. Our project presents three primary
            contributions. First, a new smart compression system leveraging deep
            learning is proposed for the WCE system. This system aims to
            significantly decrease the transmission of unnecessary data by
            sending Low-Resolution (LR) luma images, thereby conserving energy
            in the WCE device. Second, a new colorization model named
            EndoColorGAN diffusion-based is implemented to reconstruct the
            colors of WCE images. To expedite the diagnostic review of the WCE
            video, we present, on this page, a visualization demo designed for
            fast and smart summarization. At the physician’s workstation, and
            before the colorization process is done, the received video consists
            of Super Resolution Luma normal images and RGB pathological images.
            We have implemented an algorithm that enables physicians to
            visualize the pathological sequence, which constitutes the primary
            focus, before proceeding to colorize the normal images. This
            simplified process not only enhances efficiency but also provides
            critical information directly to the physician in a short time.
          </p>
          <p className="text-xs text-center  sm:w-4/5 text-gray-600 sm:px-0 px-8">
          Abderrahmane Salmi, Wei Zhang, and Feng Jiang
          </p>
          <p className="text-xs text-center  sm:w-4/5 text-gray-600 sm:px-0 px-8">
          A.I &amp; Human-Machine Engineering Lab
          </p>
        </div>
        <Header
          loading={loading}
          isColorized={isColorized}
          onTriggerColorize={handleTriggerColorizeChange}
          handleLimit={handleLimitChange}
          limit={limit}
          sequence={selectedSequence}
          onSequenceChange={handleSequenceChange}
        />
        <div className="flex">
          <CapturedImages
            handleLoading={handleLoading}
            triggerColorize={triggerColorize}
            onTriggerColorize={handleTriggerColorizeChange}
            handleIsColorized={handleIsColorized}
            limit={limit}
            selectedSequence={selectedSequence}
            selectedSequenceImages={selectedSequenceImages}
            selectedSequenceChange={handleSequenceChange}
          />
        </div>
        {/* <Sequence /> */}
      </div>
    </div>
  );
}
