<script setup>
import { ref } from "vue";
const msgProcessingPhases = ref([
  {
    obj: "Dataset Collection",
    caption: "Collecting and preparing the training data",
    icon: "pi pi-database",
    color: "#9C27B0",
    content:
      "Gather and preprocess textual data for training custom word embeddings. \
      This includes tasks like text cleaning, tokenization, and dataset splitting.",
  },
  {
    obj: "Training Model",
    caption: "Training the customized word embeddings model",
    icon: "pi pi-cog",
    color: "#673AB7",
    content:
      "Choose and configure a suitable algorithm for training word embeddings, such as Word2Vec or FastText. \
      Train the model on the prepared dataset to generate word vectors.",
  },
  {
    obj: "Model Evaluation",
    caption: "Evaluating the trained word embeddings model",
    icon: "pi pi-chart-line",
    color: "#FF9800",
    content:
      "Evaluate the quality of the trained word embeddings by checking the similarity and analogy tests. \
      Fine-tune hyperparameters to optimize performance.",
  },
  {
    obj: "Integration and Usage",
    caption: "Integrating and using the word embeddings",
    icon: "pi pi-check",
    color: "#607D8B",
    content:
      "Integrate the trained word embeddings into NLP applications such as text classification, clustering, and semantic analysis. \
      Monitor the performance and update the model as needed.",
  },
]);
</script>

<template>
  <div class="grid text-600">
    <div class="col-12">
      <div class="card">
        <h3>Documentation</h3>
      </div>

      <div class="card">
        <h5>Introduction</h5>
        <p>
          EmbedCraft is an advanced platform designed for managing customized
          word embeddings. It provides tools to collect training datasets, train
          models, and evaluate the quality of word embeddings using cutting-edge
          algorithms such as
          <a
            href="https://radimrehurek.com/gensim/models/word2vec.html"
            target="_blank"
            class="font-medium text-primary hover:underline"
            >Word2Vec</a
          >
          and
          <a
            href="https://fasttext.cc/"
            target="_blank"
            class="font-medium text-primary hover:underline"
            >FastText</a
          >. It acts as a centralized solution for developing, evaluating, and
          deploying word embeddings in various NLP applications.
        </p>

        <h5>Features</h5>
        <p>
          EmbedCraft consists of several modules with different functionalities
          to help you get the job done.
        </p>
        <ul class="line-height-3">
          <li>
            <span class="text-primary font-medium">Dashboard</span>: Presents
            critical information about the word embeddings models and their
            performance.
          </li>
          <li>
            <span class="text-primary font-medium">Training Settings</span>:
            Provides functions to configure, start, and monitor the training of
            word embeddings models.
          </li>
          <li>
            <span class="text-primary font-medium">Stored Models</span>: Offers
            functionalities to view, search, and manage the stored models.
          </li>
          <li>
            <span class="text-primary font-medium">Model Details</span>:
            Displays detailed information and evaluation metrics of a specific
            word embeddings model.
          </li>
          <li>
            <span class="text-primary font-medium">Documentation</span>:
            Comprehensive documentation covering how to utilize the features of
            EmbedCraft effectively.
          </li>
          <li>
            <span class="text-primary font-medium">Settings</span>: Customize
            system-wide settings such as theme, font size, and layout.
          </li>
        </ul>
      </div>

      <div class="card">
        <h5>Key Concepts</h5>
<ul class="line-height-3">
  <li>
    <div class="text-orange-500 font-medium">Dataset</div>
    <p>
      A collection of textual data used for training customized word embeddings. 
      Datasets must be cleaned, preprocessed, and tokenized before training.
    </p>
  </li>
  <li>
    <div class="text-orange-500 font-medium">Algorithm</div>
    <p>
      The technique used for training word embeddings, such as Word2Vec or FastText. 
      Each algorithm has its own strengths and is suitable for different types of data and tasks.
    </p>
  </li>
  <li>
    <div class="text-orange-500 font-medium">Training Settings</div>
    <p>
      Configurable parameters that control how the word embeddings model is trained. 
      Examples include vector size, window size, number of epochs, and learning rate.
    </p>
  </li>
  <li>
    <div class="text-orange-500 font-medium">Model Evaluation</div>
    <p>
      The process of assessing the quality of trained word embeddings models. 
      This includes similarity and analogy tests to verify that the model captures meaningful semantic relationships.
    </p>
  </li>
  <li>
    <div class="text-orange-500 font-medium">Stored Models</div>
    <p>
      A collection of trained word embeddings models that can be retrieved and used in various NLP applications. 
      Models can be managed, downloaded, and integrated into downstream tasks.
    </p>
  </li>
</ul>


        <h5>Workflow</h5>
        <Timeline
          :value="msgProcessingPhases"
          align="alternate"
          class="customized-timeline"
        >
          <template #marker="slotProps">
            <span
              class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="slotProps.item.icon"></i>
            </span>
          </template>
          <template #content="slotProps">
            <Card>
              <template #title>
                {{ slotProps.item.obj }}
              </template>
              <template #subtitle>
                {{ slotProps.item.caption }}
              </template>
              <template #content>
                <p class="text-600">
                  {{ slotProps.item.content }}
                </p>
              </template>
            </Card>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>
